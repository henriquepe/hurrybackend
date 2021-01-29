import Post from '@modules/Posts/infra/typeorm/entities/Post.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

@Entity('dashboardUsers')
export default class DashboardUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    typeOfUser: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    password: string;

    @Column('uuid')
    avatar_id: string;

    @ManyToOne(() => Post)
    @JoinColumn({ name: 'avatar_id' })
    avatar: string;

    @Column()
    avatar_url: string;

    @Column('varchar')
    sex: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
