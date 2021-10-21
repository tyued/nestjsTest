import { Injectable } from "@nestjs/common";
import {MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class EmailService{
    constructor(private readonly mailerService:MailerService){}

    sendMail(param): string{
        this.mailerService.sendMail({
            to: 'jjysb@163.com',
            from: 'rayj0717@vip.qq.com',
            subject: 'nestjs 测试邮件',
            text: '这里是文本内容',
            html: '<b>欢迎使用NestJs</b>'
        }).then(()=>{

        }).catch(()=>{
            return 'Error'
        })
        return 'OK'
    }
}