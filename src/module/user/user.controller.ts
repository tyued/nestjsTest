import { Body, Controller, Get, Post, Query, Headers, Patch, Param, ParseIntPipe, UsePipes} from "@nestjs/common";
import { ApiTags, ApiQuery, ApiBearerAuth, ApiResponse, ApiBody, ApiParam } from "@nestjs/swagger";
import { UserService } from './user.service'
import { User } from './class/user'
import {CusParseIntPipe} from '../../common/pipes/parse-int.pipe'

@ApiTags('user')
@Controller('/user')
export class UserController {
    // 构造器定义了UserService的来源，里面是相关的业务处理
    constructor(private readonly UserService: UserService){}

    @Get()
    // 设置swagger中的参数，required 是否必填等 
    @ApiQuery({ name:'id', required: true})
    // 设置swagger中返回的结构格式
    @ApiResponse({
        status: 200,
        description: '这里是返回...',
        type: User
    })
    // Get方法设定 @Query: id=xxx 此类格式
    getOne(@Query() {id}, @Headers('token') token): string{
        // console.log(token);
        return this.UserService.getList(id);
    }

    // patch方式设定  (':id') 是以url为 get/xxx 获取xxx的形式
    @Patch(':id')
    @ApiParam({name:'id'})
    @ApiBody({description:'更新内容啦啦啦'})
    update(@Param('id', new CusParseIntPipe()) id, @Body() {message}): string{
        // console.log(id)
        // console.log(typeof id)
        return '这里调用了Patch方法'
    }

    @Post()
    @ApiBody({description:'填写更新内容'})
    // Post方法设定 @Body: {xx:xx} 此类格式
    create(@Body() param): string {
        const newParam = {...param};
        return this.UserService.create(newParam);
    }
}