import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './students/students.module';
import { AttendanceModule } from './attendance/attendance.module';
import { ParentCommunicationModule } from './parent-communication/parent-communication.module';
import { GradesModule } from './grades/grades.module';
import { PaymentsModule } from './payments/payments.module';
import { FinancialReportModule } from './financial-report/financial-report.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'school.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    StudentsModule,
    AttendanceModule,
    ParentCommunicationModule,
    GradesModule,
    PaymentsModule,
    FinancialReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
