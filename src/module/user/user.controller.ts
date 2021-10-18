import { Body, Controller, Get, Post, Query, Headers} from "@nestjs/common";
import { ApiTags, ApiQuery, ApiBearerAuth, ApiResponse, ApiBody } from "@nestjs/swagger";
import { UserService } from './user.service'
import { User } from './class/user'

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
        console.log(token);
        return this.UserService.getList(id);
    }

    @Post()
    @ApiBody({description:'填写更新内容'})
    // Post方法设定 @Body: {xx:xx} 此类格式
    create(@Body() param): string {
        const newParam = {...param};
        return this.UserService.create(newParam);
    }
}