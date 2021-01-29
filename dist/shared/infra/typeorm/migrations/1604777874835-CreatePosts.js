"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class CreatePosts1604777874835 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'posts',
            columns: [
                {
                    name: 'key',
                    type: 'varchar',
                    isPrimary: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'size',
                    type: '	float8',
                },
                {
                    name: 'created_at',
                    type: 'timestamp with time zone',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp with time zone',
                    default: 'now()',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('posts');
    }
}
exports.default = CreatePosts1604777874835;
//# sourceMappingURL=1604777874835-CreatePosts.js.map