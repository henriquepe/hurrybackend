import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnsCreatedAtAndUpdatedAtToDrinks1604573283084
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'drinks',
            new TableColumn({
                name: 'created_at',
                type: 'timestamp with time zone',
                default: 'now()',
            }),
        );

        await queryRunner.addColumn(
            'drinks',
            new TableColumn({
                name: 'updated_at',
                type: 'timestamp with time zone',
                default: 'now()',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('drinks', 'updated_at');

        await queryRunner.dropColumn('drinks', 'created_at');
    }
}
