import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddSomeColumnsToUserTable1603837478930
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'love',
                type: 'boolean',
                isNullable: false,
                default: true,
            }),
        );

        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'state',
                type: 'varchar',
                isNullable: false,
            }),
        );

        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'city',
                type: 'varchar',
                isNullable: false,
            }),
        );

        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'birthday',
                type: 'date',
                isNullable: false,
            }),
        );

        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'cpf',
                type: 'varchar',
                isNullable: false,
            }),
        );

        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'cellphone',
                type: 'varchar',
                isNullable: false,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'cellphone');
        await queryRunner.dropColumn('users', 'cpf');
        await queryRunner.dropColumn('users', 'birthday');
        await queryRunner.dropColumn('users', 'city');
        await queryRunner.dropColumn('users', 'state');
        await queryRunner.dropColumn('users', 'love');
    }
}
