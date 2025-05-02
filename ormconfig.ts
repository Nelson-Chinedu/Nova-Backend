import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import Account from './src/modules/auth/entities/account.entity';

import Profile from './src/modules/profile/entities/profile.entity';

import getEnv from './src/helpers/getEnv';

dotenv.config();

const isDevEnv = () => process.env.NODE_ENV === 'development';

const getDbType = (): TypeOrmModuleOptions['type'] => {
  const dbType = process.env.DB_TYPE;

  const validTypes: TypeOrmModuleOptions['type'][] = [
    'postgres',
    'mysql',
    'mariadb',
    'sqlite',
    'mongodb',
    'mssql',
    'oracle',
    'cockroachdb',
    'aurora-mysql',
    'aurora-postgres',
    'spanner',
    'sap',
    'sqljs',
    'cordova',
    'nativescript',
    'react-native',
  ];

  if (!dbType || !validTypes.includes(dbType as TypeOrmModuleOptions['type'])) {
    throw new Error(`Invalid or missing DB_TYPE: ${dbType}`);
  }

  return dbType as TypeOrmModuleOptions['type'];
};

export const config = {
  type: getDbType(),
  host: getEnv('DB_HOST'),
  port: parseInt(getEnv('DB_PORT'), 10),
  username: getEnv('DB_USERNAME'),
  password: getEnv('DB_PASSWORD'),
  database: getEnv('DB_DATABASE'),
  entities: [Account, Profile],
  migrations: ['dist/src/db/migrations/*.js'],
  // synchronize: isDevEnv() ? true : false,
  logging: isDevEnv() ? true : false,
  cli: {
    // entitiesDir: 'dist/src/db/entity',
    entitiesDir: 'dist/src/**/*.entity.js',
    migrationsDir: 'dist/db/migrations',
    subscribersDir: 'dist/db/subscriber',
  },
} as DataSourceOptions;

const dataSource = new DataSource(config);

export default dataSource;
