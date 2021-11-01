// 工厂会初始化各种类借鉴了SpringBoot
import { NestFactory } from '@nestjs/core';
// 导入AppModule 类似于app.vue最大的一层,其他的Module包含在此内部(imports: [xxxModule],)
import { AppModule } from './app.module';
// DocumentBuilder
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// 引入全局过滤器 app.useGlobalFilters使用
import { HttpExceptionFilter } from './common/filters/http-exception.filter'


async function bootstrap() {
    // 这个 create()方法返回一个application对象,该对象实现了INestApplication接口，现在只需要监听3000端口，等待http请求即可
    const app = await NestFactory.create(AppModule);
    
    // 使用全局过滤器
    app.useGlobalFilters(new HttpExceptionFilter());

    // 设置swagger相关配置
    const swaggerOptions = new DocumentBuilder()
        .setTitle('nestjs api document')            // 设置标题
        .setDescription('这里是一个api说明文档')      // 设置描述
        .setVersion('1.0')                          // 设置版本
        .addBearerAuth()                            // 设置鉴权
        .build()
    // 创建swaggerModule,参数(创建目标 app, swagger配置 swaggerOptions)
    const document = SwaggerModule.createDocument(app,swaggerOptions);
    // 启动swagger,参数(路径 'doc',目标 app, swagger对象 document)
    SwaggerModule.setup('doc',app,document);
    await app.listen(3000);
}
bootstrap();
