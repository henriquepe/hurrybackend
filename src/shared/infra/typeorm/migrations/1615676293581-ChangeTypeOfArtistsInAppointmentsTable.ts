import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class ChangeTypeOfArtistsInAppointmentsTable1615676293581 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'artists_ids');
        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'artists',
            type: 'text[]',
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'artists');
        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'artists_ids',
            type: 'varchar',
        }))

    }

}
