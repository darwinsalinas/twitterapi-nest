import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetsModule } from './tweets/tweets.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [TweetsModule],
})
export class AppModule {}
