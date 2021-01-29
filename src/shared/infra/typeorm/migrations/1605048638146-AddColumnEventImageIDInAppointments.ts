import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnEventImageIDInAppointments1605048638146
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'eventImage_id',
                type: 'uuid',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'eventImage_id');
    }
}
