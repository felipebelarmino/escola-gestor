import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsController } from './controllers/students.controller';
import { StudentsService } from './services/students.service';
import { Student } from './entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService]
})
export class StudentsModule { }
