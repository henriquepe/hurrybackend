"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class AlterProviderIdWithFK1602962354609 {
    async up(queryRunner) {
        await queryRunner.dropColumn('appointments', 'provider_id');
        await queryRunner.addColumn('appointments', new typeorm_1.TableColumn({
            name: 'provider_id',
            type: 'uuid',
            isNullable: true,
        }));
        await queryRunner.createForeignKey('appointments', new typeorm_1.TableForeignKey({
            name: 'AppointmentOwnerProvider',
            columnNames: ['provider_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('appointments', 'AppointmentOwnerProvider');
        await queryRunner.dropColumn('appointments', 'provider_id');
        await queryRunner.addColumn('appointments', new typeorm_1.TableColumn({
            name: 'provider_id',
            type: 'uuid',
        }));
    }
}
exports.default = AlterProviderIdWithFK1602962354609;
