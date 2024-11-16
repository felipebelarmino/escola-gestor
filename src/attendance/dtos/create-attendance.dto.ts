import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateAttendanceDto {
    @ApiProperty({ description: 'ID do estudante' })
    @IsString()
    studentId: string;

    @ApiProperty({ description: 'Data da presença', example: '2024-11-15' })
    @IsDateString()
    date: string;

    @ApiProperty({ description: 'Presente ou ausente', default: true })
    @IsBoolean()
    isPresent: boolean | any;

    @ApiProperty({ description: 'Observações', required: false })
    @IsOptional()
    @IsString()
    remarks?: string;
}
