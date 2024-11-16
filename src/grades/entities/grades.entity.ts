import { Student } from 'src/students/entities/student.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Grade {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, { eager: true })
    @JoinColumn({ name: 'student_id' })
    student: Student;

    @Column()
    subject: string;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    grade: number;

    @Column()
    period: string;
}
