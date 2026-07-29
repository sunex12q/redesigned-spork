import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  create(createDto: CreateNotificationDto): Promise<Notification> {
    const newNotification = this.notificationsRepository.create({
      type: createDto.type,
      message: createDto.message,
      user: { id: createDto.userId },
    });
    return this.notificationsRepository.save(newNotification);
  }

  findAllForUser(userId: number): Promise<Notification[]> {
    return this.notificationsRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(id: number, userId: number): Promise<void> {
    await this.notificationsRepository.update({ id, user: { id: userId } }, { read: true });
  }
}
