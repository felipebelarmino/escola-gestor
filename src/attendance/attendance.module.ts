import { Module } from '@nestjs/common';
import { AttendanceController } from './controller/attendance.controller';
import { AttendanceService } from './service/attendance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { StudentsModule } from 'src/students/students.module';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance]), StudentsModule],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule { }
