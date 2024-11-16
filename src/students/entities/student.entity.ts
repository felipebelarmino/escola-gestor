import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
}
