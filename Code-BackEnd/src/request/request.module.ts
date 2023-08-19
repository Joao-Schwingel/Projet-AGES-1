import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { DatabaseModule } from './../database/database.module';
import { MedicamentModule } from 'src/medicament/medicament.module';
import { DriverModule } from 'src/driver/driver.module';

@Module({
  imports: [DatabaseModule, MedicamentModule, DriverModule],
  controllers: [RequestController],
  providers: [RequestService],
  exports: [RequestService],
})
export class RequestModule {}
