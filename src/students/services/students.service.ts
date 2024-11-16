import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../entities/student.entity';
import { CreateStudentDto } from '../dtos/create-student.dto';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
    ) { }

    findAll(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    findOne(id: number): Promise<Student> {
        return this.studentRepository.findOne({ where: { id } });
    }

    async create(createStudentDto: CreateStudentDto): Promise<Student> {
        const student = this.studentRepository.create(createStudentDto);
        return this.studentRepository.save(student);
    }

    async update(id: number, updateStudentDto: CreateStudentDto): Promise<Student> {
        const student = await this.studentRepository.findOne({ where: { id } });
        if (!student) {
            throw new NotFoundException(`Student with ID ${id} not found`);
        }
        Object.assign(student, updateStudentDto);
        return this.studentRepository.save(student);
    }

    async remove(id: number): Promise<void> {
        const student = await this.studentRepository.findOne({ where: { id } });
        if (!student) {
            throw new NotFoundException(`Student with ID ${id} not found`);
        }
        await this.studentRepository.delete(id);
    }
}
