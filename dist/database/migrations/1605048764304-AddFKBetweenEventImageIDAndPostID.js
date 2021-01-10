"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class AddFKBetweenEventImageIDAndPostID1605048764304 {
    async up(queryRunner) {
        await queryRunner.createForeignKey('appointments', new typeorm_1.TableForeignKey({
            name: 'eventImageIDFK',
            columnNames: ['eventImage_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'posts',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('appointments', 'eventImageIDFK');
    }
}
exports.default = AddFKBetweenEventImageIDAndPostID1605048764304;
