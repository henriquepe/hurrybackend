"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class AddColumnsCreatedAtAndUpdatedAtToDrinks1604573283084 {
    async up(queryRunner) {
        await queryRunner.addColumn('drinks', new typeorm_1.TableColumn({
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
        }));
        await queryRunner.addColumn('drinks', new typeorm_1.TableColumn({
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('drinks', 'updated_at');
        await queryRunner.dropColumn('drinks', 'created_at');
    }
}
exports.default = AddColumnsCreatedAtAndUpdatedAtToDrinks1604573283084;
