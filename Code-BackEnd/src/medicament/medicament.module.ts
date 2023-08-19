import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MedicamentController } from './medicament.controller';
import { MedicamentService } from './medicament.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MedicamentController],
  providers: [MedicamentService],
  exports: [MedicamentService],
})
export class MedicamentModule {}
