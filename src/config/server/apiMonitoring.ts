import { Application } from 'express';
import apiStats from 'swagger-stats';

function apiMonitoring(app: Application): void {
  app.use(apiStats.getMiddleware({ uriPath: '/api-stats' }));
}

export default apiMonitoring;
