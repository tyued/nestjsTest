import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
// import { AppController} from './app.controller';
// import { AppService } from './app.service';
import { UserModule } from './module/user/user.module'
import { CatsModule } from './module/cats/cats.module' 

// 引入中间件
import { LoggerMiddleware } from './common/middleware/logger.middleware'


@Module({
    imports: [UserModule,CatsModule],
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
