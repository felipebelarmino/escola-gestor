import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Grade } from 'src/grades/entities/grades.entity';

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'ID único do estudante' })
    id: number;

    @Column()
    @ApiProperty({ description: 'Nome do estudante' })
    name: string;

    @Column()
    @ApiProperty({ description: 'Idade do estudante' })
    age: number;

    @Column()
    @ApiProperty({ description: 'Classe do estudante' })
    class: string;

    @Column({ default: true })
    @ApiProperty({ description: 'Status ativo do estudante', default: true })
    isActive: boolean;

    @OneToMany(() => Grade, (grade) => grade.student, { cascade: true })
    @ApiProperty({ description: 'Notas associadas ao estudante', type: () => [Grade] })
    grades: Grade[];
}
