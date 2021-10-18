import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    getList(): string {
        return '这里是 UserService 里的返回';
    }

    create(user): string{
        return '这里是新增用户';
    }
}