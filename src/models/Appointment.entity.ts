import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import User from './User.entity';

// interface AppointmentDTO {
//     name: string;

//     provider: string;

//     date: Date;

//     image: string;

//     tickets: number;
// }

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
