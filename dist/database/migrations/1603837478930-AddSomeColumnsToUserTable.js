"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class AddSomeColumnsToUserTable1603837478930 {
    async up(queryRunner) {
        await queryRunner.addColumn('users', new typeorm_1.TableColumn({
            name: 'love',
            type: 'boolean',
            isNullable: false,
            default: true,
        }));
        await queryRunner.addColumn('users', new typeorm_1.TableColumn({
            name: 'state',
            type: 'varchar',
            isNullable: false,
        }));
        await queryRunner.addColumn('users', new typeorm_1.TableColumn({
            name: 'city',
            type: 'varchar',
            isNullable: false,
        }));
        await queryRunner.addColumn('users', new typeorm_1.TableColumn({
            name: 'birthday',
            type: 'date',
            isNullable: false,
        }));
        await queryRunner.addColumn('users', new typeorm_1.TableColumn({
            name: 'cpf',
            type: 'varchar',
            isNullable: false,
        }));
        await queryRunner.addColumn('users', new typeorm_1.TableColumn({
            name: 'cellphone',
            type: 'varchar',
            isNullable: false,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('users', 'cellphone');
        await queryRunner.dropColumn('users', 'cpf');
        await queryRunner.dropColumn('users', 'birthday');
        await queryRunner.dropColumn('users', 'city');
        await queryRunner.dropColumn('users', 'state');
        await queryRunner.dropColumn('users', 'love');
    }
}
exports.default = AddSomeColumnsToUserTable1603837478930;
