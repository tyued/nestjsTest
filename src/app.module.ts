import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
// import { MailerModule } from '@nestjs-modules/mailer';
// import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter'
import { ConfigModule,ConfigService } from 'nestjs-config'

import { resolve } from 'path';
// import { AppController} from './app.controller';
// import { AppService } from './app.service';
import { UserModule } from './module/user/user.module'
import { CatsModule } from './module/cats/cats.module' 
import { RoleModule } from './module/roleGuard/role-guard.module'
import { EmailModule } from './module/email/email.module'

// 引入中间件
import { LoggerMiddleware } from './common/middleware/logger.middleware'
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
    imports: [
        ConfigModule.load(resolve(__dirname,'config','**/!(*.d).{ts,js}')),
        MailerModule.forRootAsync({
            useFactory: (config: ConfigService) => config.get('email'),
            inject: [ConfigService],
        }),
        /**
         * 这里是无配置管理的邮件管理Module
         * by:RayJ
         * time:2021-10-21
         */
        // MailerModule.forRoot({
        //     transport:{
        //         host:'smtp.qq.com',
        //         port: 587,
        //         ignoreTLS: true,
        //         secure: false,
        //         auth:{
        //             user: 'rayj0717@vip.qq.com',
        //             pass: 'zkhsxleefvxzbiei'                    // 这里的密码不是QQ邮箱密码，而是授权码
        //         },
        //     },
        //     defaults:{
        //         from:'"姜璀" <rayj0717@vip.qq.com>',
        //     },
        //     preview:false,
        //     // 模板适配器
        //     template:{
        //         // 指定模板目录 然后在service里指定模板文件*.pug 这里用的是pug模板语言
        //         dir: resolve(__dirname,'./templates'),
        //         adapter: new PugAdapter(),
        //         options:{
        //             strict: true,
        //         }
        //     }
        // }),
        EmailModule,UserModule,CatsModule,RoleModule],
  // controllers: [AppController],
  // providers: [AppService],
})

export class AppModule {
    // consumer 为消费者：apply(应用哪个中间件) exclude(排除哪个路由) forRoutes(给哪个路由添加中间件)
    configure(consumer: MiddlewareConsumer){
        // 为 user 路由添加中间件
        consumer
            .apply(LoggerMiddleware)
            .exclude({path:'user',method:RequestMethod.POST})
            .forRoutes('user');
    }
}
