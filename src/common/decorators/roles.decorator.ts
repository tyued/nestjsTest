import { SetMetadata } from "@nestjs/common";
// 设置自定义装饰器
export const Roles = (...roles: String[]) => SetMetadata('roles',roles);