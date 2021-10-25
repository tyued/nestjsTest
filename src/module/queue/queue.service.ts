/*
https://docs.nestjs.com/providers#services
*/

import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
    constructor(@InjectQueue('queue') private readonly taskQueue:Queue){}

    showJobs(){
        // console.log('-----------');
        // console.log('completedJobs',(await this.taskQueue.getJob(['completed'])).map(job => job.id))
    }



}
