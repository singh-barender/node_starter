import { IUser } from '@root/types/user.types';
import { model, Model, Schema, Document } from 'mongoose';
import { enumRoles, roles } from '@root/globals/constants/roles';

const userSchema = new Schema<IUser>(
  {
    role: { type: String, enum: enumRoles, required: true, default: roles.USER },
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String },
    city: { type: String },
    country: { type: String },
    token: { type: String },
    expires: { type: Number },
    isActive: { type: Boolean, default: false },
    isLogged: { type: Boolean, default: false }
  },
  {
    toJSON: {
      transform: function (_doc: Document, ret) {
        delete ret.password;
        delete ret.__v;
      }
    },
    timestamps: true
  }
);

// Define the UserModel
const UserModel: Model<IUser & Document> = model<IUser & Document>('User', userSchema);

export default UserModel;
