import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    fullName: string;

    @Column({ type: 'date', nullable: true })
    dob: Date;

    @Column({ type: 'varchar', length: 255, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;

    @Column({ type: 'boolean', default: false })
    isAdmin: boolean;

    @Column({ type: 'boolean', nullable: false, default: true })
    isActive: boolean;

    @Column({ type: 'varchar', length: 255, nullable: false })
    invite_id: string;
    createdAt: Date;
}
