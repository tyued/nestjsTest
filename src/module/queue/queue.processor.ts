import { InjectQueue, OnQueueActive, Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job, Queue } from "bull";

// 队列处理器
@Processor('queue')
export class QueueProcessor{
    constructor(@InjectQueue('queue') private readonly queue:Queue){}

    private readonly logger = new Logger(QueueProcessor.name);

    // 生命周期的钩子
    @OnQueueActive()
    onActive(job: Job){
        this.logger.debug(`Processing job ${job.id} of type ${job.name} with data ${job.data}...`);
    }

    // controller传递过来的方法这里处理
    @Process('transcode')
    handleTranscode(job:Job){
        this.logger.debug('Start transcoding...');
        this.logger.debug(job.data);
        this.logger.debug('Transcoding completed');
    }

    async getAll(){
        console.log('-------------------------');
        console.log('completedJobs',(await this.queue.getJobs(['completed'])).map(job => job.id))
        console.log('waiting',(await this.queue.getJobs(['waiting'])).map(job => job.id))
        console.log('paused',(await this.queue.getJobs(['paused'])).map(job => job.id))
        console.log('failedJobs',(await this.queue.getJobs(['failed'])).map(job => job.id))
    }
}