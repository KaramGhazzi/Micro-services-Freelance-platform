import { Module } from '@nestjs/common';
import { PlanRepository } from './plan.repository';
import { PlanService } from './plan.service';
import { PlanResolver } from './plan.resolver';

@Module({
  providers: [PlanRepository, PlanService, PlanResolver],
  exports: [PlanRepository],
})
export class PlanModule {
  public constructor(private readonly planService: PlanService) {}

  onModuleInit() {
    this.planService.seed();
  }
}
