<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## 学习顺序

### 启动nestjs -- 具体查看main.ts

### 了解controller(控制器) service(服务) module(功能模块)
所有请求都会有controller中的指定路由接受 根据get、post、put、delete等调取相应 service.ts中的业务方法

module整合了 对于的controller 和 service 并挂载到app.module.ts中

### 添加swagger插件
在main.ts中加入swagger插件，配置swagger相关配置，创建swaggerModule,设置访问路径并运行在appModule中

对于每个接口设置swagger参数需要在接口中 添加 @ApiQuery @ApiBody 等修饰符来具体设置

### 中间件
客户端(请求发起端)  ---->   中间件   ---->    nest路由接收(Controller)

@Injectable()修饰 可注入服务

中间件必须 implements(实现) NestMiddleware的类

NestMiddleware里只有一个use方法,需要中间件去实现(复写)
next() 可串联多个中间件

### exception filter 异常过滤器
在@Get @Post等接口里可以做验证判断并抛出异常 throw new HttpException 在被局部异常过滤器@UseFilters(new HttpExceptionFilter())处理, HttpExceptionFilter是自定义的过滤器需要import加载进来

也可以使用全局过滤器在main.ts中添加 app.useGlobalFilters(new HttpExceptionFilter())来捕获处理

异常需要implements(实现) ExceptionFilter这个对象中的 catch 方法

### pipe 管道
转换：管道将输入数据转换为所需的数据输出

验证：对输入数据进行验证，如果验证成功继续传递; 验证失败则抛出异常;

例子：update(@Param('id', new ParseIntPipe()) id, @Body() {message}): string  
new ParseIntPipe就是一个系统内置的管道 转换类型

自定义管道1： parse-int.pipe.ts
implements(实现)PipeTransform类 并实现transform方法 

### guard 守卫
@useGuards() 路由上添加守卫

@Get具体发放前添加自定义修饰器 例如 @Roles('admin') 需配合 decorator来运行,设置修饰器名称 export const Roles, 设置关联 SetMetadata(key,value)

guard里需要实现 CanActivate 中的 canActivate方法,具体查看 role.guard.ts

### 邮件服务
npm install --save @nestjs-modules/mailer nodemailer 安装依赖

目前例子配置在app.module.ts中,也可以单独配置到config中 (这里的密码是授权码，不是登录密码!!!!) 邮件的模板格式可以使用pug模板，导入pugAdapter

操作过程：用户发起post请求 验证参数 -> controller -> 拉起service中对应的方法处理sendMail 




## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
