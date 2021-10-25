/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
// import { QueueService } from './queue.service';
import { ConfigService } from 'nestjs-config'
import { BullModule } from '@nestjs/bull'
import { QueueProcessor } from './queue.processor';


@Module({
    imports: [
        // 对于队列模块进行注册
        BullModule.registerQueueAsync({
            name: 'queue',
            useFactory: (config: ConfigService) => ({
                redis: config.get('redis')
            }),
            inject: [ConfigService]
        })
    ],
    controllers: [QueueController],
    providers: [QueueProcessor],
})
export class QueueModule { }
