/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport'

@Controller()
export class AuthController {
    constructor(private readonly authService:AuthService){}
 
    // 设置了本地守卫 参数必须为username,password貌似是PassportStragegy约定的,目前还不清楚是否可以自定义
    @UseGuards(AuthGuard('local'))
    @Post('/auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/auth/getUser')
    getInfo(): string{
        return '返回成功'
    }
}
