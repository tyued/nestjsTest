import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
    // reflector 反射器是 和自定义装饰器的桥梁
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext):  boolean {
        // 这里的roles就是自定义装饰器@Roles中的('admin')
        const roles = this.reflector.get('roles',context.getHandler());
        
        // 如果为空直接通过
        if(!roles){
            return true;
        }
        // 获取请求对象
        const request = context.switchToHttp().getRequest();
        // 获取请求参数中user属性
        const { user } = request.query;
        // 是否在@Roles('admin','xxxx') 找到url中传递过来的参数，找到返回true通过
        return !!roles.find(role => role === user);
    }
}