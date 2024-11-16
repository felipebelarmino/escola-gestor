import { Student } from 'src/students/entities/student.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class ParentCommunication {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, { eager: true })
    @JoinColumn({ name: 'student_id' })
    student: Student;

    @Column({ type: 'text' })
    message: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    sentAt: string;
}
