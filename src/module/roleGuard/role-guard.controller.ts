import { Controller, Get, UseGuards } from '@nestjs/common';
import { RoleService } from './role-guard.service';
import { RoleGuard } from '../../common/guards/role.guard'
import { Roles } from 'src/common/decorators/roles.decorator';

@UseGuards(RoleGuard)
@Controller('/role')
export class RoleController {
    constructor(private readonly RoleService:RoleService){}

    @Get()
    @Roles('admin')
    getOne(): string{
        return '这里是role的Get方法'
    }
}   