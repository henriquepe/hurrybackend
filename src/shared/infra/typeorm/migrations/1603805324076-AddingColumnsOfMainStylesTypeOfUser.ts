import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class AddingColumnsOfMainStylesTypeOfUser1603805324076
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'musicInterest1_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'users',
            new TableForeignKey({
                name: 'userMusicInterest1',
                columnNames: ['musicInterest1_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'musicstyles',
            }),
        );

        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'musicInterest2_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'users',
            new TableForeignKey({
                name: 'userMusicInterest2',
                columnNames: ['musicInterest2_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'musicstyles',
            }),
        );

        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'musicInterest3_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'users',
            new TableForeignKey({
                name: 'userMusicInterest3',
                columnNames: ['musicInterest3_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'musicstyles',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users', 'userMusicInterest3');
        await queryRunner.dropColumn('users', 'musicInterest3_id');

        await queryRunner.dropForeignKey('users', 'userMusicInterest2');
        await queryRunner.dropColumn('users', 'musicInterest2_id');

        await queryRunner.dropForeignKey('users', 'userMusicInterest1');
        await queryRunner.dropColumn('users', 'musicInterest1_id');
    }
}
