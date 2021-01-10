"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class AddColumnEventTypeToAppointments1603839842089 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'eventtypes',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    isNullable: true,
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'created_at',
                    type: 'timestamp with time zone',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp with time zone',
                    default: 'now()',
                },
            ],
        }));
        await queryRunner.addColumn('appointments', new typeorm_1.TableColumn({
            name: 'eventtype_id',
            type: 'uuid',
        }));
        await queryRunner.createForeignKey('appointments', new typeorm_1.TableForeignKey({
            name: 'eventTypeReference',
            columnNames: ['eventtype_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'eventtypes',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('appointments', 'eventTypeReference');
        await queryRunner.dropColumn('appointments', 'eventtype_id');
        await queryRunner.dropTable('eventtypes');
    }
}
exports.default = AddColumnEventTypeToAppointments1603839842089;
