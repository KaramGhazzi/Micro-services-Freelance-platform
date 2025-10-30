import { Subscribe, Topic } from '@package/azure-service-bus';
import { Injectable, Logger } from '@nestjs/common';
import {
  AssignmentApplicationCreatedEvent,
  AssignmentDeclinedEvent,
  AssignmentPendingReviewEvent,
  AssignmentViewedEvent,
  GetUsageEvent,
  GetObjectUsageEvent,
  GetObjectUsageEventResponse,
} from '@package/types/dist/events';

import { UsageRepository } from './usage.repository';
import { UsageService } from './usage.service';
import { UsageType } from '../../types/graphql/@generated';

@Injectable()
export class UsageEvents {
  private logger: Logger = new Logger(UsageEvents.name);

  public constructor(
    private readonly usageRepository: UsageRepository,
    private readonly usageService: UsageService
  ) {}

  @Subscribe(Topic.ASSIGNMENT_PENDING_REVIEW)
  async handleAssignmentReviewPending(body: AssignmentPendingReviewEvent) {
    try {
      await this.usageRepository.create({
        data: {
          amount: 1,
          companyId: body.companyId,
          type: 'ASSIGNMENT',
        },
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Subscribe(Topic.ASSIGNMENT_DECLINED)
  async handleAssignmentDeclined(body: AssignmentDeclinedEvent) {
    try {
      await this.usageRepository.create({
        data: {
          amount: -1,
          companyId: body.assignment?.company?.id,
          type: 'ASSIGNMENT',
        },
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Subscribe(Topic.ASSIGNMENT_APPLICATION_CREATED)
  async handleAssignmentApplicationCreated(
    body: AssignmentApplicationCreatedEvent
  ) {
    try {
      await this.usageService.handleObjectUsage(
        body.user.companyId,
        UsageType.ASSIGNMENT_APPLICATION,
        body.assignment.id
      );
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Subscribe(Topic.CONTRACT_GET_CREDITS)
  async handleGetCredits(body: GetUsageEvent) {
    try {
      return this.usageService.remainingCreditsByCreditType(
        body.companyId,
        body.usageType
      );
    } catch (error) {
      this.logger.error(error);

      return {
        usageType: body.usageType,
        amount: 0,
      };
    }
  }

  @Subscribe(Topic.CONTRACT_GET_OBJECT_CREDITS)
  async handleGetObjectCredits(
    body: GetObjectUsageEvent
  ): Promise<GetObjectUsageEventResponse> {
    try {
      return this.usageService.remainingObjectCreditsByCreditType(
        body.companyId,
        body.usageType,
        body.objectId
      );
    } catch (error) {
      this.logger.error(error);

      return {
        usageType: body.usageType,
        amount: 0,
      };
    }
  }

  @Subscribe(Topic.ASSIGNMENT_VIEWED)
  async handleAssignmentViewed(body: AssignmentViewedEvent): Promise<void> {
    await this.usageService.handleObjectUsage(
      body.companyId,
      UsageType.ASSIGNMENT_VIEW,
      body.assignmentId
    );
  }
}
