import { EntityRepository, Repository } from 'typeorm';
import { ProjectEntity } from '../models';
import { IProject } from '../interfaces';
import { UserRepository } from './user.repository';

@EntityRepository(ProjectEntity)
export class ProjectRepository extends Repository<ProjectEntity> {


    async findProjectsByUser(userId: string): Promise<ProjectEntity[]> {
        return this.createQueryBuilder('project')
            .leftJoinAndSelect('project.members', 'user')
            .where('user.id = :userId', { userId })
            .getMany();
    }

    async findProjectsWithTasks(): Promise<ProjectEntity[]> {
        return this.find({
            relations: ['tasks'],
        });
    }
}
