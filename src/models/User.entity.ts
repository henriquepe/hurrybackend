import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import MusicStyle from './MusicStyle.entity';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    email: string;

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

    @Column('varchar')
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;
