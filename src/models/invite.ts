import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ProjectEntity } from './index';
import { Status } from '../interfaces';

@Entity()
export class InvitationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    invite_id: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    creator: number;

    @Column({ type: 'enum', enum: Status, default: Status.active })
    status: Status;

    @ManyToOne(() => ProjectEntity, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'project_id' })
    project: ProjectEntity;
}
