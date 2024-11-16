import { Controller, Get, Post, Body, Patch, Param, Delete, Render } from '@nestjs/common';
import { AttendanceService } from '../service/attendance.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Attendance } from '../entities/attendance.entity';
import { CreateAttendanceDto } from '../dtos/create-attendance.dto';
import { UpdateAttendanceDto } from '../dtos/update-attendance.dto';
import { StudentsService } from 'src/students/services/students.service';

@ApiTags('attendance')
@Controller('attendance')
export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService, private readonly studentsService: StudentsService,) { }

    @Get()
    @ApiOperation({ summary: 'Listar todas as presenças' })
    @ApiResponse({ status: 200, description: 'Lista de presenças retornada com sucesso.' })
    @Render('attendance/index')
    async getAttendancePage() {
        const students = await this.studentsService.findAll(); // Busca todos os alunos
        return { students };
    }

    @Post()
    @ApiOperation({ summary: 'Registrar uma nova presença' })
    @ApiResponse({ status: 201, description: 'Presença registrada com sucesso.' })
    create(@Body() createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
        return this.attendanceService.create(createAttendanceDto);
    }

    @Get(':id')
    @Render('attendance/details')
    async getAttendanceDetails(@Param('id') id: string) {
        const attendances = await this.attendanceService.findByStudentId(+id);
        const student = await this.studentsService.findOne(+id);
        return { attendances, student };
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Atualizar uma presença' })
    @ApiResponse({ status: 200, description: 'Presença atualizada com sucesso.' })
    update(
        @Param('id') id: string,
        @Body() updateAttendanceDto: UpdateAttendanceDto,
    ): Promise<Attendance> {
        return this.attendanceService.update(+id, updateAttendanceDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remover uma presença' })
    @ApiResponse({ status: 200, description: 'Presença removida com sucesso.' })
    remove(@Param('id') id: string): Promise<void> {
        return this.attendanceService.remove(+id);
    }
}
