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
} from '@nestjs/common';
import { AttendanceService } from '../service/attendance.service';
import { StudentsService } from 'src/students/services/students.service';
import { CreateAttendanceDto } from '../dtos/create-attendance.dto';
import { UpdateAttendanceDto } from '../dtos/update-attendance.dto';

@Controller('attendance')
export class AttendanceController {
    constructor(
        private readonly attendanceService: AttendanceService,
        private readonly studentsService: StudentsService,
    ) { }

    @Get()
    @Render('attendance/index')
    async getAttendancePage() {
        const students = await this.studentsService.findAll();
        return { students };
    }

    @Get('create/:studentId')
    @Render('attendance/register')
    async createAttendancePage(@Param('studentId') studentId: string) {
        const student = await this.studentsService.findOne(+studentId);
        return { student };
    }

    @Post('create')
    @Redirect('/attendance')
    async create(@Body() createAttendanceDto: CreateAttendanceDto) {
        await this.attendanceService.create(createAttendanceDto);
    }

    @Get(':id')
    @Render('attendance/details')
    async getAttendanceDetails(@Param('id') id: string) {
        const attendances = await this.attendanceService.findByStudentId(+id);
        const student = await this.studentsService.findOne(+id);
        return { attendances, student };
    }

    @Patch(':id')
    @Redirect('/attendance')
    async update(
        @Param('id') id: number,
        @Body() updateAttendanceDto: UpdateAttendanceDto,
    ) {
        await this.attendanceService.update(id, updateAttendanceDto);
    }

    @Delete(':id')
    @Redirect('/attendance')
    async remove(@Param('id') id: number) {
        await this.attendanceService.remove(id);
    }

    @Get('edit/:id')
    @Render('attendance/edit')
    async editAttendancePage(@Param('id') id: number) {
        const attendance = await this.attendanceService.findOne(id);
        const student = attendance.student;
        return { attendance, student };
    }
}
