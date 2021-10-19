import { Module } from '@nestjs/common';
import { RoleController } from './role-guard.controller';
import { RoleService } from './role-guard.service';

@Module({
    controllers: [RoleController],
    providers:[RoleService]
})
export class RoleModule {};