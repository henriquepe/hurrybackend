import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnStateCityStreetToAppointments1603906986576
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'state',
                type: 'varchar',
            }),
        );

        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'city',
                type: 'varchar',
            }),
        );

        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'street',
                type: 'varchar',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'street');
        await queryRunner.dropColumn('appointments', 'city');
        await queryRunner.dropColumn('appointments', 'state');
    }
}
