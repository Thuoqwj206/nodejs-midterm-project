import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TypeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false, default: 'Default' })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: false, default: 'White' })
    color: string;

    @Column({ type: 'boolean', default: true })
    isVisible: boolean;
}
