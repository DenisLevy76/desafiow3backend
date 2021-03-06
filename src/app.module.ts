import { DrivingModule } from './adapters/driving/driving.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DrivingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
