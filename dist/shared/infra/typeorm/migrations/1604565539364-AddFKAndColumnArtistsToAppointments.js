"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class AddFKAndColumnArtistsToAppointments1604565539364 {
    async up(queryRunner) {
        await queryRunner.addColumn('appointments', new typeorm_1.TableColumn({
            name: 'artists_ids',
            type: 'varchar[]',
            isNullable: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('appointments', 'artists_ids');
    }
}
exports.default = AddFKAndColumnArtistsToAppointments1604565539364;
//# sourceMappingURL=1604565539364-AddFKAndColumnArtistsToAppointments.js.map