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

import User from './User.entity';

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    provider_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id' })
    provider: string;

    @Column('varchar')
    musicstyle_id: string;

    @ManyToOne(() => MusicStyle)
    @JoinColumn({ name: 'musicstyle_id' })
    musicstyle: string;

    @Column('timestamp with time zone')
    date: Date;

    @Column('varchar')
    eventImage: string;

    @Column('numeric')
    tickets: number;

    @CreateDateColumn()
    created_at: number;

    @UpdateDateColumn()
    updated_at: number;
}

export default Appointment;
