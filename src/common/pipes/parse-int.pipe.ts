import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata) {
      const val = parseInt(value,10);
      if(isNaN(val)){
          throw new BadRequestException('数据类型错误')
      }
    return val;
  }
}