/*
https://docs.nestjs.com/controllers#controllers
*/
import { Controller, Get } from '@nestjs/common';
import { DeptService } from './dept.service';

@Controller('dept')
export class DeptController { 
    constructor(private readonly deptService:DeptService){}

    @Get()
    findAll(){
        return this.deptService.findAll();
    }
}
