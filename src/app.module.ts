import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProcessesModule } from './processes/processes.module';

@Module({
  imports: [ProcessesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
