import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Grade {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'ID único da nota' })
    id: number;

    @ManyToOne(() => Student, { eager: true })
    @JoinColumn({ name: 'studentId' })
    @ApiProperty({ description: 'Aluno relacionado à nota' })
    student: Student;

    @Column()
    @ApiProperty({ description: 'Disciplina da nota' })
    subject: string;

    @Column('float')
    @ApiProperty({ description: 'Valor da nota' })
    grade: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty({ description: 'Data da avaliação' })
    date: string;
}
