import { Student } from 'src/students/entities/student.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, { eager: true })
    @JoinColumn({ name: 'student_id' })
    student: Student;

    @Column({ type: 'date' })
    date: string;

    @Column({ default: true })
    isPresent: boolean;

    @Column({ nullable: true })
    remarks: string;
}
