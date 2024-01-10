import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PriorityEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'int', nullable: false })
    order: number;

    @Column({ type: 'boolean', default: true })
    isVisible: boolean;
}
