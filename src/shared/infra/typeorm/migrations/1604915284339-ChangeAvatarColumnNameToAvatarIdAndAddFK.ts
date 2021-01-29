import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class ChangeAvatarColumnNameToAvatarIdAndAddFK1604915284339
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'avatar');

        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'avatar_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'users',
            new TableForeignKey({
                name: 'avatarForeignKey',
                columnNames: ['avatar_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'posts',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users', 'avatarForeignKey');

        await queryRunner.dropColumn('users', 'avatar_id');

        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
            }),
        );
    }
}
