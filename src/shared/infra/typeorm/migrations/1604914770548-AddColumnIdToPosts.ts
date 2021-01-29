import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnIdToPosts1604914770548
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'posts',
            new TableColumn({
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
            }),
        );

        await queryRunner.dropColumn('posts', 'key');

        await queryRunner.addColumn(
            'posts',
            new TableColumn({
                name: 'key',
                type: 'varchar',
                isNullable: false,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('posts', 'key');

        await queryRunner.addColumn(
            'posts',
            new TableColumn({
                name: 'key',
                type: 'varchar',
                isPrimary: true,
            }),
        );

        await queryRunner.dropColumn('posts', 'id');
    }
}
