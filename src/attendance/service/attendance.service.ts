import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from '../entities/attendance.entity';
import { CreateAttendanceDto } from '../dtos/create-attendance.dto';
import { UpdateAttendanceDto } from '../dtos/update-attendance.dto';

@Injectable()
export class AttendanceService {
    constructor(
        @InjectRepository(Attendance)
        private readonly attendanceRepository: Repository<Attendance>,
    ) { }

    create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
        const attendance = this.attendanceRepository.create(createAttendanceDto);
        return this.attendanceRepository.save(attendance);
    }

    findAll(): Promise<Attendance[]> {
        return this.attendanceRepository.find({ relations: ['student'] });
    }

    findOne(id: number): Promise<Attendance> {
        return this.attendanceRepository.findOne({ where: { id }, relations: ['student'] });
    }

    findByStudentId(studentId: number): Promise<Attendance[]> {
        return this.attendanceRepository.find({
            where: { student: { id: studentId } },
            relations: ['student'],
        });
    }


    async update(id: number, updateAttendanceDto: UpdateAttendanceDto): Promise<Attendance> {
        const attendance = await this.attendanceRepository.findOne({ where: { id } });
        if (!attendance) {
            throw new NotFoundException(`Attendance with ID ${id} not found`);
        }
        await this.attendanceRepository.update(id, updateAttendanceDto);
        return this.attendanceRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        const attendance = await this.attendanceRepository.findOne({ where: { id } });
        if (!attendance) {
            throw new NotFoundException(`Attendance with ID ${id} not found`);
        }
        await this.attendanceRepository.delete(id);
    }


}
