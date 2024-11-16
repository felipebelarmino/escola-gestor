import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class CreateStudentDto {
    @ApiProperty({ description: 'Nome do estudante' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Idade do estudante' })
    @IsInt()
    age: number;

    @ApiProperty({ description: 'Classe do estudante' })
    @IsString()
    class: string;

    @ApiProperty({ description: 'Status ativo do estudante', default: true })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
