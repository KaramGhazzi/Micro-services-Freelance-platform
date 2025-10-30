import { ObjectType } from '@nestjs/graphql';
import { LoginOutput } from '../login/login.output';

@ObjectType()
export class ConfirmOutput extends LoginOutput {}
