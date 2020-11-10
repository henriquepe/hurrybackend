import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnsToPostsTable1604778216338
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'posts',
            new TableColumn({
                name: 'url',
                type: 'varchar',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('posts', 'url');
    }
}
