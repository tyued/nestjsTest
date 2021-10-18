// 工厂会初始化各种类借鉴了SpringBoot
import { NestFactory } from '@nestjs/core';
// 导入AppModule 类似于app.vue最大的一层,其他的Module包含在此内部(imports: [xxxModule],)
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  // 这个create()方法返回一个application对象,该对象实现了INestApplication接口，现在只需要监听3000端口，等待http请求即可
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
