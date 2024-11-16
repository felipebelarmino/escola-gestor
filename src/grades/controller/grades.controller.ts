import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    Render,
    Redirect,
    HttpException,
    HttpStatus,
    Query,
} from '@nestjs/common';
import { StudentsService } from '../../students/services/students.service';
import { GradesService } from '../service/grades.service';
import { CreateGradeDto } from '../dtos/create-grade.dto';
import { UpdateGradeDto } from '../dtos/edit-grade.dto';

@Controller('grades')
export class GradesController {
    constructor(
        private readonly gradesService: GradesService,
        private readonly studentsService: StudentsService,
    ) { }

    @Get()
    @Render('grades/index')
    async findAll(
        @Query('student') studentName?: string,
        @Query('subject') subject?: string,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        const filters = { studentName, subject, startDate, endDate };
        const grades = await this.gradesService.findWithFilters(filters);
        const groupedBySubject = this.groupBySubject(grades);

        return { grades, groupedBySubject, filters };
    }

    private groupBySubject(grades: any[]) {
        return grades.reduce((acc, grade) => {
            if (!acc[grade.subject]) {
                acc[grade.subject] = [];
            }
            acc[grade.subject].push(grade);
            return acc;
        }, {});
    }

    @Get('create')
    @Render('grades/create')
    async createPage() {
        const students = await this.studentsService.findAll();
        if (!students || students.length === 0) {
            throw new HttpException('No students found to assign grades.', HttpStatus.NOT_FOUND);
        }
        return { students };
    }

    @Post()
    @Redirect('/grades')
    async create(@Body() createGradeDto: CreateGradeDto) {
        const student = await this.studentsService.findOne(createGradeDto.studentId);
        if (!student) {
            throw new HttpException('Student not found.', HttpStatus.BAD_REQUEST);
        }
        await this.gradesService.create(createGradeDto);
    }

    @Get('edit/:id')
    @Render('grades/edit')
    async editPage(@Param('id') id: string) {
        const grade = await this.gradesService.findOne(+id);
        if (!grade) {
            throw new HttpException('Grade not found.', HttpStatus.NOT_FOUND);
        }
        const students = await this.studentsService.findAll();
        return { grade, students };
    }

    @Patch(':id')
    @Redirect('/grades')
    async update(@Param('id') id: string, @Body() updateGradeDto: UpdateGradeDto) {
        const grade = await this.gradesService.findOne(+id);
        if (!grade) {
            throw new HttpException('Grade not found.', HttpStatus.NOT_FOUND);
        }

        const student = await this.studentsService.findOne(updateGradeDto.studentId);
        if (!student) {
            throw new HttpException('Student not found.', HttpStatus.BAD_REQUEST);
        }

        await this.gradesService.update(+id, updateGradeDto);
    }

    @Delete(':id')
    @Redirect('/grades')
    async remove(@Param('id') id: string) {
        await this.gradesService.remove(+id);
    }
}
