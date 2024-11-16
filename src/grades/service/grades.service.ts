import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from '../entities/grades.entity';
import { CreateGradeDto } from '../dtos/create-grade.dto';
import { StudentsService } from 'src/students/services/students.service';
import { UpdateGradeDto } from '../dtos/edit-grade.dto';
import { Student } from 'src/students/entities/student.entity';

@Injectable()
export class GradesService {
    constructor(
        @InjectRepository(Grade)
        private readonly gradeRepository: Repository<Grade>,
        @InjectRepository(Student)
        private readonly studentsRepository: Repository<Student>,
        private readonly studentsService: StudentsService,
    ) { }

    findAll() {
        return this.gradeRepository.find({ relations: ['student'] });
    }

    async findWithFilters(filters: {
        studentName?: string;
        subject?: string;
        startDate?: string;
        endDate?: string;
    }) {
        const query = this.gradeRepository.createQueryBuilder('grade')
            .leftJoinAndSelect('grade.student', 'student');

        if (filters.studentName) {
            query.andWhere('student.name LIKE :name', { name: `%${filters.studentName}%` });
        }

        if (filters.subject) {
            query.andWhere('grade.subject LIKE :subject', { subject: `%${filters.subject}%` });
        }

        if (filters.startDate) {
            query.andWhere('grade.date >= :startDate', { startDate: new Date(filters.startDate) });
        }

        if (filters.endDate) {
            query.andWhere('grade.date <= :endDate', { endDate: new Date(filters.endDate) });
        }

        return query.getMany();
    }

    findOne(id: number) {
        return this.gradeRepository.findOne({ where: { id }, relations: ['student'] });
    }

    async create(createGradeDto: CreateGradeDto): Promise<Grade> {
        const { studentId, subject, grade } = createGradeDto;

        const student = await this.studentsService.findOne(studentId);
        if (!student) {
            throw new NotFoundException(`Estudante com ID ${studentId} não encontrado`);
        }

        const newGrade = this.gradeRepository.create({
            student,
            subject,
            grade,
        });

        return this.gradeRepository.save(newGrade);
    }

    async update(id: number, updateGradeDto: UpdateGradeDto): Promise<Grade> {
        const { studentId, ...rest } = updateGradeDto;

        const grade = await this.gradeRepository.findOne({ where: { id }, relations: ['student'] });
        if (!grade) {
            throw new NotFoundException('Nota não encontrada');
        }

        if (studentId) {
            const student = await this.studentsRepository.findOne({ where: { id: studentId } });
            if (!student) {
                throw new NotFoundException('Estudante não encontrado');
            }
            grade.student = student;
        }

        Object.assign(grade, rest);
        return this.gradeRepository.save(grade);
    }


    async remove(id: number): Promise<void> {
        const grade = await this.gradeRepository.findOne({ where: { id } });
        if (!grade) {
            throw new NotFoundException(`Nota com ID ${id} não encontrada.`);
        }
        await this.gradeRepository.remove(grade);
    }
}
