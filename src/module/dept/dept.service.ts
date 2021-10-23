/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeptEntity } from './dept.entity';

@Injectable()
export class DeptService {
        constructor(@InjectRepository(DeptEntity)
        private readonly deptRepository: Repository<DeptEntity>,
    ){}

    async findAll():Promise<DeptEntity[]>{
        return await this.deptRepository.find({id:3});
    }
}
