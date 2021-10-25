/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('file')
export class FileController { 

    constructor(private readonly fileService:FileService){}

    // 用form-data上传 key为file ！！！！ 
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    upload(@UploadedFile() file){
        console.log(file,'file')
        // this.fileService.upload(file);
        return true;
    }

}
