import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    Render,
    Redirect,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { FinancialService } from '../service/financial.service';
import { FinancialTransaction } from '../entities/financial-report.entity';

@Controller('financial-report')
export class FinancialController {
    constructor(private readonly financialService: FinancialService) { }

    @Get()
    @Render('financial-report/index')
    async getFinancialReport() {
        try {
            const transactions = await this.financialService.findAll();
            const summary = await this.financialService.calculateSummary();
            return { transactions, summary };
        } catch (error) {
            throw new BadRequestException('Erro ao carregar os relatórios financeiros.');
        }
    }

    @Get('create')
    @Render('financial-report/create')
    createPage() {
        return {};
    }

    @Post()
    @Redirect('/financial-report')
    async create(@Body() transactionData: Partial<FinancialTransaction>) {
        try {
            await this.financialService.create(transactionData);
        } catch (error) {
            throw new BadRequestException('Erro ao criar a transação.');
        }
    }

    @Get('edit/:id')
    @Render('financial-report/edit')
    async editPage(@Param('id') id: number) {
        try {
            const transaction = await this.financialService.findOne(id);
            if (!transaction) {
                throw new NotFoundException(`Transação com ID ${id} não encontrada.`);
            }
            return { transaction };
        } catch (error) {
            throw new BadRequestException('Erro ao carregar a página de edição.');
        }
    }

    @Patch(':id')
    @Redirect('/financial-report')
    async update(
        @Param('id') id: number,
        @Body() transactionData: Partial<FinancialTransaction>,
    ) {
        try {
            const updated = await this.financialService.update(id, transactionData);
            if (!updated) {
                throw new NotFoundException(`Transação com ID ${id} não encontrada.`);
            }
        } catch (error) {
            throw new BadRequestException('Erro ao atualizar a transação.');
        }
    }

    @Delete(':id')
    @Redirect('/financial-report')
    async remove(@Param('id') id: number) {
        await this.financialService.remove(id);
    }
}
