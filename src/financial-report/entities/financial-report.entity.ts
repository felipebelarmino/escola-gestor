import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('financial_transactions')
export class FinancialTransaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    date: string;

    @Column()
    description: string;

    @Column({ type: 'varchar', length: 10 })
    type: 'income' | 'expense';

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;
}
