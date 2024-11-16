import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class UpdateGradeDto {
    @IsNumber()
    @IsNotEmpty()
    studentId: number;

    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsNumber()
    @IsNotEmpty()
    grade: number;
}
