/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService { 
    constructor(private readonly jwtService:JwtService){}

    // 这里是验证密码通过数据库访问。
    async validateUser(username: string, pass: string): Promise<any> {
        // const user = await this.usersService.find(username);
        // const user = { name: 'walker123', password: '123321' };
        // if (user && user.password) {
        //   const { password, ...result } = user;
        //   return result;
        // }
        // return null;
      }

    async login(user: any): Promise<any>{
        const payload = {username: user.username, sub: user.userId};
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
