import { Injectable } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';

@Injectable()
export class TweetsService {
  tweets = [];

  create(createTweetDto: CreateTweetDto) {
    const maxId =
      this.tweets.length > 0 ? this.tweets[this.tweets.length - 1].id + 1 : 1;
    this.tweets.push({
      id: maxId,
      ...createTweetDto,
    });
    return {
      message: 'Tweet created successfully',
      status: 201,
      data: maxId,
    };
  }

  findAll() {
    return this.tweets;
  }

  findOne(id: number) {
    const tweet = this.tweets.find((tweet) => tweet.id === id);
    return {
      data: tweet,
      status: 200,
    };
  }

  update(id: number, updateTweetDto: UpdateTweetDto) {
    const tweetIndex = this.tweets.findIndex((tweet) => tweet.id === id);
    const tweet = this.tweets[tweetIndex];

    if (tweetIndex < 0) {
      return {
        data: null,
        message: 'Tweet not found',
        status: 404,
      };
    }

    tweet.tweet_text = updateTweetDto.tweet_text;

    this.tweets[tweetIndex] = tweet;

    return {
      data: tweet,
      status: 200,
    };
  }

  remove(id: number) {
    const tweetIndex = this.tweets.findIndex((tweet) => tweet.id === id);

    if (tweetIndex < 0) {
      return {
        data: null,
        message: 'Tweet not found',
        status: 404,
      };
    }

    this.tweets.splice(tweetIndex, 1);
    return {
      data: null,
      status: 200,
      message: 'Tweet removed successfully',
    };
  }
}
