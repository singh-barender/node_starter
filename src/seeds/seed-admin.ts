import mongoose from 'mongoose';
import connection from '@root/config/db/connection';
import UserModel from '@root/features/users/models/user.model';
import { createLogger } from '@root/config/env/config';
import { generateHashPassword } from '@root/globals/jwt/services';

const log = createLogger('seed-admin');

async function seedAdmin(): Promise<void> {
  let success = false;
  try {
    await connection();
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
      return;
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

async function closeConnection(success: boolean): Promise<void> {
  try {
    await mongoose.connection.close();
    log.info('MongoDB connection closed.');
    if (success) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (error) {
    log.error('Error closing MongoDB connection:', error);
    process.exit(1);
  }
}

seedAdmin().then(() => {
  log.info('Seed operation completed.');
});
