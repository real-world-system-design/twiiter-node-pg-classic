import { EntityRepository, Repository } from 'typeorm';
import { Tweet } from '../entities/posts.entity';

@EntityRepository(Tweet)
export class PostsRepository extends Repository<Tweet> {}
