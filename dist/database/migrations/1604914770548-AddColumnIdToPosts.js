"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class AddColumnIdToPosts1604914770548 {
    async up(queryRunner) {
        await queryRunner.addColumn('posts', new typeorm_1.TableColumn({
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
        }));
        await queryRunner.dropColumn('posts', 'key');
        await queryRunner.addColumn('posts', new typeorm_1.TableColumn({
            name: 'key',
            type: 'varchar',
            isNullable: false,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('posts', 'key');
        await queryRunner.addColumn('posts', new typeorm_1.TableColumn({
            name: 'key',
            type: 'varchar',
            isPrimary: true,
        }));
        await queryRunner.dropColumn('posts', 'id');
    }
}
exports.default = AddColumnIdToPosts1604914770548;
