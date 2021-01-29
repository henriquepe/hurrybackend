import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import User from '@modules/Users/infra/typeorm/entities/User.entity';
import EventType from '@modules/EventsType/infra/typeorm/entities/EventType.entity';
import MusicStyle from '@modules/MusicsStyle/infra/typeorm/entities/MusicStyle.entity';
import Post from '@modules/Posts/infra/typeorm/entities/Post.entity';

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
    artists_ids: string[];

    @Column('varchar')
    musicstyle_id: string;

    @ManyToOne(() => MusicStyle)
    @JoinColumn({ name: 'musicstyle_id' })
    musicstyle: string;

    @Column('varchar')
    eventtype_id: string;

    @ManyToOne(() => EventType)
    @JoinColumn({ name: 'eventtype_id' })
    eventtype: string;

    @Column('timestamp with time zone')
    date: Date;

    @Column('varchar')
    eventImage_url: string;

    @Column('uuid')
    eventImage_id: string;

    @ManyToOne(() => Post)
    @JoinColumn({ name: 'eventImage_id' })
    eventImage: string;

    @Column('numeric')
    tickets: number;

    @Column('varchar')
    state: string;

    @Column('varchar')
    city: string;

    @Column('varchar')
    street: string;

    @CreateDateColumn()
    created_at: number;

    @UpdateDateColumn()
    updated_at: number;
}

export default Appointment;
