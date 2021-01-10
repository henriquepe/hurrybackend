"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class AddColumnEventImageIDInAppointments1605048638146 {
    async up(queryRunner) {
        await queryRunner.addColumn('appointments', new typeorm_1.TableColumn({
            name: 'eventImage_id',
            type: 'uuid',
            isNullable: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('appointments', 'eventImage_id');
    }
}
exports.default = AddColumnEventImageIDInAppointments1605048638146;
