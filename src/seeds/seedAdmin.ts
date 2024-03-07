import mongoose from 'mongoose';
import connectToMongoDB from '@root/config/db/mongodb';
import UserModel from '@root/features/users/models/user.model';
import { createLogger } from '@root/config/env/config';
import { generateHashPassword } from '@root/globals/jwt/services';

const log = createLogger('seed-admin');

async function closeConnection(success: boolean): Promise<void> {
  try {
    await mongoose.connection.close();
    log.info('MongoDB connection closed.');
    process.exit(success ? 0 : 1);
  } catch (error) {
    log.error('Error closing MongoDB connection:', error);
    process.exit(1);
  }
}

async function seedAdmin(): Promise<void> {
  let success = false;
  try {
    await connectToMongoDB();
    const hashedPassword = await generateHashPassword('Test@123');
    const adminPayload = {
      role: 'admin',
      username: 'admin123',
      email: 'admin@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: hashedPassword,
      isActive: true
    };

    const existingAdmin = await UserModel.findOne({ email: adminPayload.email });
    if (existingAdmin) {
      log.info('Admin already exists in the database.');
      return closeConnection(success);
    }

    await UserModel.create(adminPayload);
    success = true;
    log.info('Admin added successfully.');
  } catch (error) {
    log.error('Error seeding admin:', error);
  } finally {
    await closeConnection(success);
  }
}

void seedAdmin().then(() => {
  log.info('Seed operation completed.');
});
