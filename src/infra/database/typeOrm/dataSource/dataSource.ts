import { DataSource } from 'typeorm';
import configuration from '../../../../config/configuration';
import { config } from 'dotenv';

config();

const configs = configuration();

export default new DataSource({
  type: 'postgres',
  host: configs.database.host,
  port: configs.database.port,
  username: configs.database.username,
  password: configs.database.password,
  database: configs.database.name,
  entities: ['./src/infra/database/typeOrm/models/**/*.ts'],
  migrations: ['./src/infra/database/typeOrm/migrations/*.ts'],
});
