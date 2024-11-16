import { Student } from 'src/students/entities/student.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, { eager: true })
    @JoinColumn({ name: 'student_id' })
    student: Student;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'date' })
    dueDate: string;

    @Column({ type: 'date', nullable: true })
    paidDate: string;

    @Column({ default: 'pending' })
    status: string;
}
