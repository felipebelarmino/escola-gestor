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

    async create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
        const attendance = this.attendanceRepository.create({
            ...createAttendanceDto,
            student: { id: +createAttendanceDto.studentId },
        });
        return this.attendanceRepository.save(attendance);
    }

    async findAll(): Promise<Attendance[]> {
        return this.attendanceRepository.find({ relations: ['student'] });
    }

    async findOne(id: number): Promise<Attendance> {
        const attendance = await this.attendanceRepository.findOne({
            where: { id },
            relations: ['student'],
        });
        if (!attendance) {
            throw new NotFoundException(`Attendance with ID ${id} not found`);
        }
        return attendance;
    }

    async findByStudentId(studentId: number): Promise<Attendance[]> {
        const result = await this.attendanceRepository.find({
            where: { student: { id: studentId } },
            relations: ['student'],
        });

        return result;
    }

    async update(
        id: number,
        updateAttendanceDto: UpdateAttendanceDto,
    ): Promise<Attendance> {
        const attendance = await this.findOne(id);

        const isPresent =
            updateAttendanceDto.isPresent === 'true'
                ? true
                : updateAttendanceDto.isPresent === 'false'
                    ? false
                    : undefined;

        await this.attendanceRepository.update(id, {
            ...updateAttendanceDto,
            isPresent: isPresent !== undefined ? isPresent : attendance.isPresent,
            student: { id: +attendance.student.id },
        });

        return this.findOne(id);
    }


    async remove(id: number): Promise<void> {
        const attendance = await this.findOne(id);
        await this.attendanceRepository.remove(attendance);
    }
}
