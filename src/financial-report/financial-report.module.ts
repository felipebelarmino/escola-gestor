import { Module } from '@nestjs/common';
import { FinancialController } from './controller/financial.controller';
import { FinancialService } from './service/financial.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialTransaction } from './entities/financial-report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialTransaction])],
  controllers: [FinancialController],
  providers: [FinancialService],
  exports: [FinancialService]
})
export class FinancialReportModule { }
