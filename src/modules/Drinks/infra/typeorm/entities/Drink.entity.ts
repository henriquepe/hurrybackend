import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('drinks')
class Drink {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    product_brand: string;

    @Column('varchar')
    quantity: number;

    @CreateDateColumn()
    created_at: number;

    @UpdateDateColumn()
    updated_at: number;
}

export default Drink;
