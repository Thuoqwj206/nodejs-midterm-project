import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../models';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {


    async findActiveUsers(): Promise<UserEntity[]> {
        return this.find({
            where: { isActive: true },
        });
    }

    async findInactiveUsers(): Promise<UserEntity[]> {
        return this.find({
            where: { isActive: false },
        });
    }


}
