import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { TaskStatus } from '../task.model';
export class TaskStatusValidationPipe implements PipeTransform {
  private allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    if (!value) {
      throw new BadRequestException('value is required');
    }

    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException();
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
