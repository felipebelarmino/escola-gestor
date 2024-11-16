import { Module } from '@nestjs/common';
import { GradesController } from './controller/grades.controller';
import { GradesService } from './service/grades.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from './entities/grades.entity';
import { StudentsModule } from 'src/students/students.module';
import { Student } from 'src/students/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grade, Student]), StudentsModule],
  controllers: [GradesController],
  providers: [GradesService],
  exports: [GradesService]
})
export class GradesModule { }
