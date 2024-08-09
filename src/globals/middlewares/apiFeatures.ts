/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PopulateOptions, Query } from 'mongoose';

/**
 * Interface for query parameters.
 */
interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  fields?: string;
  select?: string;
  populate?: string;
  createdAfter?: string;
}

/**
 * Class representing API features for filtering, sorting, and paginating queries.
 */
export class APIFeatures {
  private _query: Query<any, any>;
  private queryParams: QueryParams;

  /**
   * Constructs an instance of APIFeatures.
   * @param query The Mongoose query object.
   * @param queryParams The query parameters.
   */
  constructor(query: Query<any, any>, queryParams: QueryParams) {
    this._query = query;
    this.queryParams = queryParams;
  }

  /**
   * Gets the current Mongoose query object.
   * @returns The Mongoose query object.
   */
  public get query(): Query<any, any> {
    return this._query;
  }

  /**
   * Sets the Mongoose query object.
   * @param value The Mongoose query object to set.
   */
  public set query(value: Query<any, any>) {
    this._query = value;
  }

  /**
   * Filters the query based on query parameters.
   * @returns The instance of APIFeatures for method chaining.
   */
  filter() {
    let queryObj = { ...this.queryParams };
    const excludeFields = ['page', 'sort', 'limit', 'fields', 'select'];
    excludeFields.forEach((el) => delete (queryObj as Record<string, any>)[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt|ne|regex|options|all|in|exists|not|size|or|text|search)\b/g, (match) => `$${match}`);
    queryObj = JSON.parse(queryStr);
    this.query = this.query.find(queryObj);
    return this;
  }

  /**
   * Populates the query.
   * @param populate The field(s) to populate.
   * @returns The instance of APIFeatures for method chaining.
   */
  populate(options: PopulateOptions | PopulateOptions[]) {
    if (options) {
      if (Array.isArray(options)) {
        options.forEach((option) => {
          this.query = this.query.populate(option);
        });
      } else {
        this.query = this.query.populate(options);
      }
    }
    return this;
  }

  /**
   * Sorts the query based on sort parameter.
   * @returns The instance of APIFeatures for method chaining.
   */
  sort() {
    if (this.queryParams.sort) {
      const sortBy = this.queryParams.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('_id');
    }
    return this;
  }

  /**
   * Limits the fields to be retrieved.
   * @returns The instance of APIFeatures for method chaining.
   */
  limitFields() {
    if (this.queryParams.fields) {
      const fields = this.queryParams.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    if (this.queryParams.select) {
      const fields = this.queryParams.select.split(',').join(' ');
      this.query = this.query.select(fields);
    }
    return this;
  }

  /**
   * Paginates the query based on page and limit parameters.
   * @returns A promise resolving to the paginated results.
   */
  async paginate() {
    let page = this.queryParams.page;
    const limit = this.queryParams.limit || 25;
    if (!page || page < 1) {
      page = 1;
    }
    const startIndex = (page - 1) * limit;
    const countQuery = this.query.clone();
    const total = await countQuery.countDocuments();
    const totalPages = Math.ceil(total / limit);
    this.query = this.query.skip(startIndex).limit(limit);
    if (this.queryParams.populate) {
      this.query = this.query.populate(this.queryParams.populate);
    }
    const results: {
      length: number;
      limit: number;
      totalElements: number;
      totalPages: number;
    } = await this.query;
    const pagination: {
      next?: {
        page: number;
        limit: number;
      };
      prev?: {
        page: number;
        limit: number;
      };
    } = {};
    if (page * limit < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }
    results.limit = limit;
    results.totalElements = total;
    results.totalPages = totalPages;
    return {
      success: true,
      limit: limit,
      totalElements: total,
      totalPages: totalPages,
      count: results.length,
      pagination,
      data: results
    };
  }

  /**
   * Filters the query based on creation time.
   * @returns The instance of APIFeatures for method chaining.
   */
  filterByCreationTime() {
    if (this.queryParams.createdAfter) {
      const date = new Date(this.queryParams.createdAfter);
      this.query = this.query.find({ createdAt: { $gte: date } });
    }
    return this;
  }
}
