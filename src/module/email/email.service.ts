import { Injectable } from "@nestjs/common";
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class EmailService{
    constructor(private readonly mailerService:MailerService){}

    sendMail(param): string{
        this.mailerService.sendMail({
            to: 'jjysb@163.com',
            from: 'rayj0717@vip.qq.com',
            subject: 'nestjs 测试邮件带格式',
            // text: '这里是文本内容',
            // 使用模板文件
            template:'./email',
            // html: '<b>欢迎使用NestJs</b>',
            // 模板接受的参数对象
            context:{
                username:'发件人：姜璀',
                phonenum:'13499999999'
            }
        }).then(()=>{

        }).catch(()=>{
            return 'Error'
        })
        return 'OK'
    }
}