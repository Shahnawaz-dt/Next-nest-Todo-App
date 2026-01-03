import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module'; // Make sure this is imported

@Module({
  imports: [TasksModule], // Make sure TasksModule is in this array
  controllers: [],
  providers: [],
})
export class AppModule {}