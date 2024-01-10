import { EntityRepository, Repository } from 'typeorm';
import { TaskEntity } from '../models';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
    async findById(id: number): Promise<TaskEntity[]> {
        return this.find({
            where: { id: id },
            relations: ['assignee', 'priority', 'status', 'type'],
        });
    }
    async getAllTasksForProject(id: number): Promise<TaskEntity[]> {
        return this.find({
            where: { project: true },
            relations: ['assignee', 'priority', 'status', 'type'],
        });
    }
}
