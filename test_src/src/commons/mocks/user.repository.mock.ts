import { UserEntity } from "../../entities/user.entity";
import { Repository } from "typeorm";

export class MockUserRepository extends Repository<UserEntity> {
    async findOne() {
        return new UserEntity();
    }
}