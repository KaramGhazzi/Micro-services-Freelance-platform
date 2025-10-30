import { Controller, Get } from '@nestjs/common';

@Controller('_health')
export class HealthController {
  // eslint-disable-next-line class-methods-use-this
  @Get()
  getHealth(): string {
    // eslint-disable-next-line no-useless-return
    return;
  }
}
