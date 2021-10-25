/*
https://docs.nestjs.com/controllers#controllers
*/

import { InjectQueue } from '@nestjs/bull';
import { Controller, Get, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { QueueProcessor } from './queue.processor';
// import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
    constructor(
        @InjectQueue('queue') private readonly queue:Queue,
        private readonly queueService:QueueProcessor
    ){}

    @Post('transcode')
    async transcode(){
        // 添加一个处理事务到队列中
        await this.queue.add('transcode',{file:'audio.mp3'},{delay:1000});
    }

    @Get('transcode')
    async getAll(){
        return await this.queueService.getAll();
    }

}
