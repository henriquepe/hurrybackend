"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class ChangeNotNullToPossibleNullInEventImageURL1605050918493 {
    async up(queryRunner) {
        await queryRunner.dropColumn('appointments', 'eventImage_url');
        await queryRunner.addColumn('appointments', new typeorm_1.TableColumn({
            name: 'eventImage_url',
            type: 'varchar',
            isNullable: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('appointments', 'eventImage_url');
        await queryRunner.addColumn('appointments', new typeorm_1.TableColumn({
            name: 'eventImage_url',
            type: 'varchar',
        }));
    }
}
exports.default = ChangeNotNullToPossibleNullInEventImageURL1605050918493;
//# sourceMappingURL=1605050918493-ChangeNotNullToPossibleNullInEventImageURL.js.map