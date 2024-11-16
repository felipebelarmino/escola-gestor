import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    NotFoundException,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        // Renderizar uma página EJS para rotas não encontradas
        response.status(404).render('errors/404', {
            path: request.url,
        });
    }
}
