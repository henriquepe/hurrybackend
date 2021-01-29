"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class AddingColumnsOfMainStylesTypeOfUser1603805324076 {
    async up(queryRunner) {
        await queryRunner.addColumn('users', new typeorm_1.TableColumn({
            name: 'musicInterest1_id',
            type: 'uuid',
            isNullable: true,
        }));
        await queryRunner.createForeignKey('users', new typeorm_1.TableForeignKey({
            name: 'userMusicInterest1',
            columnNames: ['musicInterest1_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'musicstyles',
        }));
        await queryRunner.addColumn('users', new typeorm_1.TableColumn({
            name: 'musicInterest2_id',
            type: 'uuid',
            isNullable: true,
        }));
        await queryRunner.createForeignKey('users', new typeorm_1.TableForeignKey({
            name: 'userMusicInterest2',
            columnNames: ['musicInterest2_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'musicstyles',
        }));
        await queryRunner.addColumn('users', new typeorm_1.TableColumn({
            name: 'musicInterest3_id',
            type: 'uuid',
            isNullable: true,
        }));
        await queryRunner.createForeignKey('users', new typeorm_1.TableForeignKey({
            name: 'userMusicInterest3',
            columnNames: ['musicInterest3_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'musicstyles',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('users', 'userMusicInterest3');
        await queryRunner.dropColumn('users', 'musicInterest3_id');
        await queryRunner.dropForeignKey('users', 'userMusicInterest2');
        await queryRunner.dropColumn('users', 'musicInterest2_id');
        await queryRunner.dropForeignKey('users', 'userMusicInterest1');
        await queryRunner.dropColumn('users', 'musicInterest1_id');
    }
}
exports.default = AddingColumnsOfMainStylesTypeOfUser1603805324076;
//# sourceMappingURL=1603805324076-AddingColumnsOfMainStylesTypeOfUser.js.map