/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';

@Injectable()
export class FileService { 
    constructor(private readonly configService:ConfigService){}

    upload(file){
        console.log(file);
    }

}
