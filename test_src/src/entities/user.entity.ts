import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity('users')
export class UserEntity  extends BaseEntity {
    @Column({ length: 30, nullable: false, unique: true })
    email: string

    @Column({ length: 50 })
    username: string

    @Column({ length: 240, nullable: true, default: null })
    bio: string
}
