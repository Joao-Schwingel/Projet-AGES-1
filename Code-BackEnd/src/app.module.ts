import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { RolesGuard } from './roles/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { MedicamentModule } from './medicament/medicament.module';
import { RequestController } from './request/request.controller';
import { RequestModule } from './request/request.module';
import { DriverController } from './driver/driver.controller';
import { DriverService } from './driver/driver.service';
import { DriverModule } from './driver/driver.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    DatabaseModule,
    MedicamentModule,
    RequestModule,
    DriverModule,
  ],
  controllers: [RequestController, DriverController],
  providers: [DriverService],
})
export class AppModule {}
