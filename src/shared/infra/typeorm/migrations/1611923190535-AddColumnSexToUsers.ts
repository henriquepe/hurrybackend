import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnSexToUsers1611923190535
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'sex',
                type: 'varchar',
                isNullable: false,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'sex');
    }
}
