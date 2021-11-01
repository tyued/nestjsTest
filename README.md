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

$ npm i -g @nestjs/cli

$ nest new project-name

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

resolve(__dirname) 默认输出地址是 dist目录, 静态模板在src里，需要在nest-cli.json中配置 compilerOptions assets:['templates/**/*'] 这样会把 templates的内容拷贝到dist中

### 项目配置管理 @nestjs/config
npm install --save @nestjs/config 依赖先装

在app.modules.ts里配置config路径和参数。 导入 import { ConfigModule,ConfigService } from 'nestjs-config'

ConfigModule.load() 读取指定文件夹下的所有ts,js文件. 获取并设置具体的配置项 config.get('email');

### 服务监控
npm install --save @nestjs/platform-socket.io

npm install --save nest-status-monitor

config/statusMonitor.ts配置 监控参数，路径等基本固定，需扩展看其他相关文档，或者自己用nodejs的原生能力做一套监控页面

### jwt 鉴权
npm install passport passport-jwt passport-local @nestjs/passport @nestjs/jwt -S

npm install --save-dev @types/passport-local

给路由加上守卫 @UseGuards()  AuthGuard('local')本地守卫需要传递 username,password 自动调用local.strategy.ts 中的 validate() 进行验证,期间会调用 authService.validateUser方法,对于用户名和密码进行认证。成功后返回用户对象.. ----这里算是跑完完整的守卫时间..然后进入路由方法里 调用 authService.login() 把用户对象传进去 利用jwtService.sign方法生成并返回 token

其他接口如果用jwt策略守卫 AuthGuard('jwt')就可以,再路由访问前会率先验证header中的token,如果验证通过才能继续接下来的业务方法

### mysql数据库与typeorm
npm install --save @nestjs/typeorm typeorm sql2

app.module.ts中添加 TypeOrmModule模块, forRootAsync() 读取config中的database.ts

Controller 和其他一样无需调整

Service 添加实体entity 并生成Repository对象 操作orm的方法(详见:orm的操作指南,例子中使用了最简单的find()方法)

Module 中imports了实体entity TypeOrmModule.forFeature 这样service中才能使用

Entity 实体层跟数据库表中对应,这里可以做onetomany 等一对多连接,也可以排除一些不必显示的字段比如：密码字段等

### 定时任务
npm install --save @nestjs/schedule 安装相关插件

task目录为定时任务测试文件

app.module.ts中添加 schedule定时模块 imports[]中添加scheduleModule.forRoot(),

在task.service.ts 中添加各个定时条件 @Cron('* * * * * *') 每到一定时间去运行 {秒数} {分钟} {小时} {日期} {月份} {星期} {年份(可为空)}

@Interval @Timeout 分别和js的定义相同

### 队列任务
先添加redis.ts 的配置,配置在queue.module.ts中 和 app.module.ts的配置一样

例子目前是利用redis来完成队列功能

入口controller.ts, 队列处理由 queue.processor.ts来完成。 controller中@InjectQueue插入队列

在post请求接口时 this.queue.add('xxx') 添加一个处理事务到队列中 processor.ts中用 @Process('xxx') 来接受事件处理。

@OnQueueActive、@OnQueueError、@OnQueueWaiting、@OnQueueStalled、@OnQueueProgress、@OnQueueCompleted、@OnQueueFailed、@OnQueuePaused、@OnQueueResumed、@OnQueueCleaned、@OnQueueDrained、@OnQueueRemoved 这些都是 Processor处理器的 生命周期的钩子

### 文件上传、打包下载
npm install --save @types/multer 安装相关插件

在config包里配置文件上传配置，路径，文件包，和文件名等

在file.module.ts中imports connfig中的配置  MulterModule.registerAsync

controller中使用Interceptors 拦截器  获取key为file 的值 然后再调用 @UploadedFile把文件上传到配置文件中设置的位置





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
