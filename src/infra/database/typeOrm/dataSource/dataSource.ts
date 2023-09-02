import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

const configService = new ConfigService();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('database.host'),
  port: +configService.get('database.port'),
  username: configService.get('database.username'),
  password: configService.get('database.password'),
  database: configService.get('database.name'),
  entities: ['./src/infra/database/typeOrm/entities/**/*.ts'],
  migrations: ['./src/infra/database/typeOrm/migrations/*.ts'],
});

export default AppDataSource;
