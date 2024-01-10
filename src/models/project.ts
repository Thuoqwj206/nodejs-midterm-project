import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { TaskEntity, UserEntity } from './index';

@Entity()
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    slug: string;

    @Column({ type: 'date', nullable: true })
    startDate: Date;

    @Column({ type: 'date', nullable: true })
    endDate: Date;

    @OneToMany(() => TaskEntity, (task) => task.project)
    tasks: TaskEntity[];

    @ManyToMany(() => UserEntity, { cascade: true })
    @JoinTable({
        name: 'project_members',
        joinColumn: { name: 'project_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
    })
    members: UserEntity[];
}
