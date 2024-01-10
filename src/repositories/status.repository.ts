import { EntityRepository, Repository } from 'typeorm';
import { StatusEntity } from '../models';

@EntityRepository(StatusEntity)
export class StatusRepository extends Repository<StatusEntity> {

    async findVisibleStatuses(): Promise<StatusEntity[]> {
        return this.find({
            where: { isVisible: true },
        });
    }

    async findHiddenStatuses(): Promise<StatusEntity[]> {
        return this.find({
            where: { isVisible: false },
        });
    }
}
