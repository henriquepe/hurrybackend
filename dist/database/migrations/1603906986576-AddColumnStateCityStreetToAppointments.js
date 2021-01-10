"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class AddColumnStateCityStreetToAppointments1603906986576 {
    async up(queryRunner) {
        await queryRunner.addColumn('appointments', new typeorm_1.TableColumn({
            name: 'state',
            type: 'varchar',
        }));
        await queryRunner.addColumn('appointments', new typeorm_1.TableColumn({
            name: 'city',
            type: 'varchar',
        }));
        await queryRunner.addColumn('appointments', new typeorm_1.TableColumn({
            name: 'street',
            type: 'varchar',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('appointments', 'street');
        await queryRunner.dropColumn('appointments', 'city');
        await queryRunner.dropColumn('appointments', 'state');
    }
}
exports.default = AddColumnStateCityStreetToAppointments1603906986576;
