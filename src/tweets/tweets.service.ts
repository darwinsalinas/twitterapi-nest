import { Injectable } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { FilterTweetDto } from './dto/filter-tweet.dto';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class TweetsService {
  tweets: Tweet[] = [];

  create(createTweetDto: CreateTweetDto) {
    const maxId =
      this.tweets.length > 0 ? this.tweets[this.tweets.length - 1].id + 1 : 1;
    this.tweets.push({
      id: maxId,
      ...createTweetDto,
      tweet_date: new Date(),
    });
    return {
      message: 'Tweet created successfully',
      status: 201,
      data: maxId,
    };
  }

  findAll(query: FilterTweetDto) {
    let filteredTweets = this.tweets;

    if (query.tweet_date) {
      console.log(query);
      filteredTweets = filteredTweets.filter(
        (tweet) => tweet.tweet_date == query.tweet_date,
      );
    }

    if (query.tweet_text) {
      console.log(query);
      filteredTweets = filteredTweets.filter((tweet) =>
        tweet.tweet_text.includes(query.tweet_text),
      );
    }

    if (query.user_id) {
      console.log(query);
      filteredTweets = filteredTweets.filter(
        (tweet) => tweet.user_id == tweet.user_id,
      );
    }

    return filteredTweets;
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
