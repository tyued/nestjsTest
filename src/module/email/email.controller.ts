import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EmailService } from './email.service'
import { resolve } from 'path';

@Controller('email')
export class EmailController {
    constructor(private readonly EmailService:EmailService){}

    @Post()
    sendMail(@Body() param): string{
        // console.log(resolve(__dirname,'../../templates'),'__dirname')
        return this.EmailService.sendMail(param);
        // return 'a'
    }

}