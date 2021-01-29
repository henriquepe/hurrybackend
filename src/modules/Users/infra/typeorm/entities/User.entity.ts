import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import MusicStyle from '@modules/MusicsStyle/infra/typeorm/entities/MusicStyle.entity';
import Post from '@modules/Posts/infra/typeorm/entities/Post.entity';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    email: string;

    @Column('boolean')
    love: boolean;

    @Column('varchar')
    state: string;

    @Column('varchar')
    sex: string;

    @Column('varchar')
    city: string;

    @Column('date')
    birthday: Date;

    @Column('varchar')
    cpf: string;

    @Column('varchar')
    cellphone: string;

    @Column('varchar')
    musicInterest1_id: string;

    @ManyToOne(() => MusicStyle)
    @JoinColumn({ name: 'musicInterest1_id' })
    musicinterest1: string;

    @Column('varchar')
    musicInterest2_id: string;

    @ManyToOne(() => MusicStyle)
    @JoinColumn({ name: 'musicInterest2_id' })
    musicinterest2: string;

    @Column('varchar')
    musicInterest3_id: string;

    @ManyToOne(() => MusicStyle)
    @JoinColumn({ name: 'musicInterest3_id' })
    musicinterest3: string;

    @Column('varchar')
    password: string;

    @Column('uuid')
    avatar_id: string;

    @ManyToOne(() => Post)
    @JoinColumn({ name: 'avatar_id' })
    avatar: string;

    @Column()
    avatar_url: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;
