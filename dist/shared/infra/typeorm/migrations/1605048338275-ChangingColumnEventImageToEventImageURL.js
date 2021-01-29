"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class ChangingColumnEventImageToEventImageURL1605048338275 {
    async up(queryRunner) {
        await queryRunner.dropColumn('appointments', 'eventImage');
        await queryRunner.addColumn('appointments', new typeorm_1.TableColumn({
            name: 'eventImage_url',
            type: 'varchar',
            isNullable: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('appointments', 'eventImage_url');
        await queryRunner.addColumn('appointments', new typeorm_1.TableColumn({
            name: 'eventImage',
            type: 'varchar',
        }));
    }
}
exports.default = ChangingColumnEventImageToEventImageURL1605048338275;
//# sourceMappingURL=1605048338275-ChangingColumnEventImageToEventImageURL.js.map