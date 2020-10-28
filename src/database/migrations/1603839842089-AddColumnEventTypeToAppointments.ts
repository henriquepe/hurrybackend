import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class AddColumnEventTypeToAppointments1603839842089
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'eventtypes',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        isNullable: true,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                ],
            }),
        );

        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'eventtype_id',
                type: 'uuid',
            }),
        );

        await queryRunner.createForeignKey(
            'appointments',
            new TableForeignKey({
                name: 'eventTypeReference',
                columnNames: ['eventtype_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'eventtypes',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'eventTypeReference');

        await queryRunner.dropColumn('appointments', 'eventtype_id');

        await queryRunner.dropTable('eventtypes');
    }
}
