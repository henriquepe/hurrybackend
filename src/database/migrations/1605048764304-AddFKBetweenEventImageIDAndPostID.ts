import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AddFKBetweenEventImageIDAndPostID1605048764304
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'appointments',
            new TableForeignKey({
                name: 'eventImageIDFK',
                columnNames: ['eventImage_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'posts',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'eventImageIDFK');
    }
}
