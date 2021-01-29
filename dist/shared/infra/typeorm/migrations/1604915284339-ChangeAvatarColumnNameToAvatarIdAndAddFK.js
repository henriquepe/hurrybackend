"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class ChangeAvatarColumnNameToAvatarIdAndAddFK1604915284339 {
    async up(queryRunner) {
        await queryRunner.dropColumn('users', 'avatar');
        await queryRunner.addColumn('users', new typeorm_1.TableColumn({
            name: 'avatar_id',
            type: 'uuid',
            isNullable: true,
        }));
        await queryRunner.createForeignKey('users', new typeorm_1.TableForeignKey({
            name: 'avatarForeignKey',
            columnNames: ['avatar_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'posts',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('users', 'avatarForeignKey');
        await queryRunner.dropColumn('users', 'avatar_id');
        await queryRunner.addColumn('users', new typeorm_1.TableColumn({
            name: 'avatar',
            type: 'varchar',
        }));
    }
}
exports.default = ChangeAvatarColumnNameToAvatarIdAndAddFK1604915284339;
//# sourceMappingURL=1604915284339-ChangeAvatarColumnNameToAvatarIdAndAddFK.js.map