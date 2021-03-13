"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class CreateTableDashboardUsers1611937538287 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'dashboardUsers',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    generationStrategy: 'uuid',
                    isPrimary: true,
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'typeOfUser',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'avatar_id',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'avatar_url',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'sex',
                    type: 'varchar',
                    isNullable: false,
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
        await queryRunner.createForeignKey('dashboardUsers', new typeorm_1.TableForeignKey({
            name: 'avatarForeignKeyDashboardUser',
            columnNames: ['avatar_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'posts',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('dashboardUsers', 'avatarForeignKeyDashboardUser');
        await queryRunner.dropTable('dashboardUsers');
    }
}
exports.default = CreateTableDashboardUsers1611937538287;
//# sourceMappingURL=1611937538287-CreateTableDashboardUsers.js.map