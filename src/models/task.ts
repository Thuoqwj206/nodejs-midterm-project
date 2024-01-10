import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PriorityEntity, ProjectEntity, StatusEntity, TypeEntity, UserEntity } from './index';

@Entity()
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ProjectEntity, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'project_id' })
    project: ProjectEntity;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @ManyToOne(() => TypeEntity, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'type_id' })
    type: TypeEntity;

    @ManyToOne(() => PriorityEntity, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'priority_id' })
    priority: PriorityEntity;

    @ManyToOne(() => StatusEntity, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'status_id' })
    status: StatusEntity;

    @ManyToOne(() => UserEntity, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'assignee_id' })
    assignee: UserEntity;

    @Column({ type: 'date', nullable: false })
    startDate: Date;

    @Column({ type: 'date', nullable: false })
    endDate: Date;
}
