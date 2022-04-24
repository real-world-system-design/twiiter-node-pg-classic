import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";

@Entity('articles')
export class ArticleEntity extends BaseEntity {
    @Column({ length: 100, unique: true, nullable: false })
    title: string

    @Column({ length: 250, default: 'This article has no body' })
    body: string

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'author_id' })
    author: UserEntity
}