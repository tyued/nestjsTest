import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EmailService } from './email.service'

@Controller('email')
export class EmailController {
    constructor(private readonly EmailService:EmailService){}

    @Post()
    sendMail(@Body() param): string{
        return this.EmailService.sendMail(param);
    }

}