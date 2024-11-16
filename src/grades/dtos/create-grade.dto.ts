
import { ApiProperty } from '@nestjs/swagger';

export class CreateGradeDto {
    @ApiProperty({ description: 'ID do estudante associado à nota' })
    studentId: number;

    @ApiProperty({ description: 'Disciplina da nota' })
    subject: string;

    @ApiProperty({ description: 'Valor da nota' })
    grade: number;
}
