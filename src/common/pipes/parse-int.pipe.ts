import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
// 实现pipeTransform类中的transform方法,<string>目前指定参数类型,默认可以不写就是any类型
export class CusParseIntPipe implements PipeTransform<string> {
    transform(value: string, metadata: ArgumentMetadata) {
        // 字符串转换数字
        const val = parseInt(value,10);
        // 如果非数字抛出异常 全局过滤器HttpExceptionFilter处理
        if(isNaN(val)){
            throw new BadRequestException('数据类型错误')
        }
        return val;
    }
}