"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class AddColumnSexToUsers1611923190535 {
    async up(queryRunner) {
        await queryRunner.addColumn('users', new typeorm_1.TableColumn({
            name: 'sex',
            type: 'varchar',
            isNullable: false,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('users', 'sex');
    }
}
exports.default = AddColumnSexToUsers1611923190535;
//# sourceMappingURL=1611923190535-AddColumnSexToUsers.js.map