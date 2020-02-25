import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule, MongooseModule.forRoot('mongodb://localhost/nest')],
})
export class AppModule {}
