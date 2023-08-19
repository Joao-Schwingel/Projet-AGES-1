import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [DriverController],
  providers: [DriverService],
  exports: [DriverService],
})
export class DriverModule {}
