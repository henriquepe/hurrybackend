"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class CreateDrinks1604572174401 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'drinks',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'product_brand',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'quantity',
                    type: 'integer',
                    isNullable: false,
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('drinks');
    }
}
exports.default = CreateDrinks1604572174401;
//# sourceMappingURL=1604572174401-CreateDrinks.js.map