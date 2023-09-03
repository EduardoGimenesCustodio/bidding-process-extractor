import { Module } from '@nestjs/common';
import { ProcessesModule } from './processes/processes.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ItemsModule } from './items/items.module';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: +configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        autoLoadEntities: true,
      }),
    }),
    EventEmitterModule.forRoot(),
    ProcessesModule,
    ItemsModule,
  ],
})
export class AppModule {
  constructor() {}
}
