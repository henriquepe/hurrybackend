"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class AddColumnOfMusicStyleInAppointments1603804630778 {
    async up(queryRunner) {
        await queryRunner.addColumn('appointments', new typeorm_1.TableColumn({
            name: 'musicstyle_id',
            type: 'uuid',
            isNullable: true,
        }));
        await queryRunner.createForeignKey('appointments', new typeorm_1.TableForeignKey({
            name: 'AppointmentMusicStyle',
            columnNames: ['musicstyle_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'musicstyles',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('appointments', 'AppointmentMusicStyle');
        await queryRunner.dropColumn('appointments', 'musicstyle_id');
    }
}
exports.default = AddColumnOfMusicStyleInAppointments1603804630778;
//# sourceMappingURL=1603804630778-AddColumnOfMusicStyleInAppointments.js.map