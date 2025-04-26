import * as dotenv from 'dotenv';
import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import getEnv from './src/helpers/getEnv';

dotenv.config();

const isDevEnv = () => process.env.NODE_ENV === 'development';

const entities = isDevEnv()
  ? `${path.join(__dirname, '**', '*.entity{.ts,.js}')}`
  : `${path.join(__dirname, '**', '*.entity{.ts,.js}')}`;

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

const config = {
  type: getDbType(),
  host: getEnv('DB_HOST'),
  port: parseInt(getEnv('DB_PORT'), 10),
  username: getEnv('DB_USERNAME'),
  password: getEnv('DB_PASSWORD'),
  database: getEnv('DB_DATABASE'),
  entities: [entities],
  synchronize: isDevEnv() ? true : false,
  logging: isDevEnv() ? true : false,
  autoLoadEntities: true,
  cli: {
    entitiesDir: 'dist/db',
    migrationsDir: 'dist/db/migration',
    subscribersDir: 'dist/db/subscriber',
  },
} as TypeOrmModuleOptions;

export default config;
