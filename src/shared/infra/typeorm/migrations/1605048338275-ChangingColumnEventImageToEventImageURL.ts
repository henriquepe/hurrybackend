import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangingColumnEventImageToEventImageURL1605048338275
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'eventImage');

        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'eventImage_url',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'eventImage_url');

        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'eventImage',
                type: 'varchar',
            }),
        );
    }
}
