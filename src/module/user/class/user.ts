import { ApiProperty } from "@nestjs/swagger";

// // 定义枚举
// // export enum User{
// // }

export class User {
    @ApiProperty()
    id: string;
}