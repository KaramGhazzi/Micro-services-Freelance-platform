import { PipeTransform, Injectable } from '@nestjs/common';
import { graphqlSelect } from '../utils/graphql';

@Injectable()
export class PrismaSelectPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
  transform(value: any) {
    return graphqlSelect(value);
  }
}
