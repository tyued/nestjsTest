import { Controller, Get, HttpException, HttpStatus, Query, UseFilters } from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter'

// 使用局部过滤器争对与(/cats)路由
@UseFilters(new HttpExceptionFilter())
@Controller('/cats')
export class CatsController {
    constructor(private readonly CatsService: CatsService){}

    @Get()
    getOne(@Query() {id} ): string{
        if(!id){
            throw new HttpException(
                {status: HttpStatus.BAD_REQUEST, message:'请求必须传入参数 id',error:'id is required'},
                HttpStatus.BAD_REQUEST,
            );
        }
        return this.CatsService.getOne();
    }
}