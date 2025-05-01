import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

import { AppModule } from '../../app.module';

import { seedAccount } from './account.seed';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  if (process.env.NODE_ENV === 'production') {
    throw new Error('Seeding is not allowed in production');
  }

  try {
    console.log('Resetting database...');

    // Initialize connection if not already initialized
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    // Drop the database
    console.log('Dropping database...');
    await dataSource.dropDatabase();
    console.log('Database dropped.');

    // Run migrations to recreate the schema
    console.log('Running migrations...');
    await dataSource.runMigrations();
    console.log('Migrations completed.');

    // Seed the database with initial data
    console.log('Seeding data...');
    await seedAccount(dataSource);
    console.log('Data seeded successfully.');
  } catch (error) {
    console.log(error);
  } finally {
    await dataSource.destroy();
    await app.close();
  }
}

bootstrap().catch((err) => {
  console.error('Error seeding data:', err);
  process.exit(1);
});
