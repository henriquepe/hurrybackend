"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class ChangingAvatarProperties1602973671129 {
    async up(queryRunner) {
        await queryRunner.dropColumn('users', 'avatar');
        await queryRunner.addColumn('users', new typeorm_1.TableColumn({
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('users', 'avatar');
        await queryRunner.addColumn('users', new typeorm_1.TableColumn({
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
        }));
    }
}
exports.default = ChangingAvatarProperties1602973671129;
//# sourceMappingURL=1602973671129-ChangingAvatarProperties.js.map