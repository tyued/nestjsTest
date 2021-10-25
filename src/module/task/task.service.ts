/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TaskService {
    private readonly logger = new Logger(TaskService.name);

    @Cron('30 * * * * *')
    handleCron(){
        this.logger.debug('call Cron');
    }

    @Interval(10000)
    handleInterval(){
        this.logger.debug('call Interval')
    }

    @Timeout(20000)
    handleTimeout(){
        this.logger.debug('call Timeout')
    }
}
