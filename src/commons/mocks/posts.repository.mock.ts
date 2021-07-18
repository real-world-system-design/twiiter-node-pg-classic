import { Tweet } from '../../entities/posts.entity';
import { Repository } from 'typeorm';

export class MockPostsRepository extends Repository<Tweet> {}
