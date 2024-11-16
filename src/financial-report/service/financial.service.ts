import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinancialTransaction } from '../entities/financial-report.entity';

@Injectable()
export class FinancialService {
    constructor(
        @InjectRepository(FinancialTransaction)
        private readonly transactionRepository: Repository<FinancialTransaction>,
    ) { }

    private validateTransactionType(type: string) {
        const validTypes = ['income', 'expense'];
        if (!validTypes.includes(type)) {
            throw new BadRequestException(`Invalid transaction type: ${type}`);
        }
    }

    findAll() {
        return this.transactionRepository.find();
    }

    findOne(id: number) {
        return this.transactionRepository.findOne({ where: { id } });
    }

    create(transactionData: Partial<FinancialTransaction>) {
        this.validateTransactionType(transactionData.type);
        const transaction = this.transactionRepository.create(transactionData);
        return this.transactionRepository.save(transaction);
    }

    async update(id: number, transactionData: Partial<FinancialTransaction>) {
        if (transactionData.type) {
            this.validateTransactionType(transactionData.type);
        }
        await this.transactionRepository.update(id, transactionData);
        return this.findOne(id);
    }

    remove(id: number) {
        return this.transactionRepository.delete(id);
    }

    async calculateSummary() {
        const transactions = await this.findAll();
        const income = transactions
            .filter((transaction) => transaction.type === 'income')
            .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

        const expenses = transactions
            .filter((transaction) => transaction.type === 'expense')
            .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

        const balance = income - expenses;

        return { income, expenses, balance };
    }
}
