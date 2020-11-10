import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

import aws from 'aws-sdk';

const s3 = new aws.S3();

@Entity('posts')
class Post {
    @PrimaryGeneratedColumn()
    id: string;

    @PrimaryColumn('varchar')
    key: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    size: number;

    @Column('varchar')
    url: string;

    @CreateDateColumn()
    created_at: number;

    @UpdateDateColumn()
    updated_at: number;
}

export default Post;
