import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private readonly UserService: UserService){}

    @Get()
    get(): string{
        return this.UserService.getList();
    }

    @Post()
    async create(@Body() param){
        const newParam = {...param};
        await this.UserService.create(newParam);
    }
}