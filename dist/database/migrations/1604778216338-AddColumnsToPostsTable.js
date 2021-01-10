"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class AddColumnsToPostsTable1604778216338 {
    async up(queryRunner) {
        await queryRunner.addColumn('posts', new typeorm_1.TableColumn({
            name: 'url',
            type: 'varchar',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('posts', 'url');
    }
}
exports.default = AddColumnsToPostsTable1604778216338;
