import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FinancialReport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    month: number;

    @Column()
    year: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    totalIncome: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    totalExpenses: number;
}
