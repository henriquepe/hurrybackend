"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class ChangeTypeOfArtistsInAppointmentsTable1615676293581 {
    async up(queryRunner) {
        await queryRunner.dropColumn('appointments', 'artists_ids');
        await queryRunner.addColumn('appointments', new typeorm_1.TableColumn({
            name: 'artists',
            type: 'text[]'
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('appointments', 'artists');
        await queryRunner.addColumn('appointments', new typeorm_1.TableColumn({
            name: 'artists_ids',
            type: 'varchar'
        }));
    }
}
exports.default = ChangeTypeOfArtistsInAppointmentsTable1615676293581;
//# sourceMappingURL=1615676293581-ChangeTypeOfArtistsInAppointmentsTable.js.map