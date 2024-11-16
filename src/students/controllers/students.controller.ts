import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    Render,
    Redirect,
} from '@nestjs/common';
import { CreateStudentDto } from '../dtos/create-student.dto';
import { StudentsService } from '../services/students.service';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) { }

    /**
     * Renderiza a página de listagem de alunos agrupados por classe.
     */
    @Get()
    @Render('students/index')
    async getStudentsPage() {
        const students = await this.studentsService.findAll();

        // Agrupar alunos por classe
        const groupedStudents = students.reduce((groups, student) => {
            const className = student.class || 'Sem Classe';
            if (!groups[className]) {
                groups[className] = [];
            }
            groups[className].push(student);
            return groups;
        }, {});

        // Ordenar alunos dentro de cada grupo por nome
        for (const className in groupedStudents) {
            groupedStudents[className].sort((a, b) => a.name.localeCompare(b.name));
        }

        return { groupedStudents };
    }

    /**
     * Renderiza a página para criação de um novo aluno.
     */
    @Get('create')
    @Render('students/create')
    getCreateStudentPage() {
        return {};
    }

    /**
     * Cria um novo aluno e redireciona para a listagem.
     */
    @Post()
    @Redirect('/students')
    async createStudent(@Body() createStudentDto: CreateStudentDto) {
        await this.studentsService.create(createStudentDto);
    }

    /**
     * Renderiza a página de edição de um aluno específico.
     */
    @Get('edit/:id')
    @Render('students/edit')
    async getEditStudentPage(@Param('id') id: string) {
        const student = await this.studentsService.findOne(+id);
        if (!student) {
            throw new Error('Aluno não encontrado'); // Ou utilize uma exceção personalizada
        }
        return { student };
    }

    /**
     * Atualiza um aluno existente e redireciona para a listagem.
     */
    @Patch(':id')
    @Redirect('/students')
    async updateStudent(
        @Param('id') id: string,
        @Body() updateStudentDto: CreateStudentDto,
    ) {
        await this.studentsService.update(+id, updateStudentDto);
    }

    /**
     * Exclui um aluno e redireciona para a listagem.
     */
    @Delete(':id')
    @Redirect('/students')
    async deleteStudent(@Param('id') id: string) {
        await this.studentsService.remove(+id);
    }
}
