import { EntityRepository, Repository } from 'typeorm';
import { PriorityEntity } from '../models';

@EntityRepository(PriorityEntity)
export class PriorityRepository extends Repository<PriorityEntity> {

    async findVisiblePriorities(): Promise<PriorityEntity[]> {
        return this.find({
            where: { isVisible: true },
        });
    }

    async findHiddenPriorities(): Promise<PriorityEntity[]> {
        return this.find({
            where: { isVisible: false },
        });
    }
}
