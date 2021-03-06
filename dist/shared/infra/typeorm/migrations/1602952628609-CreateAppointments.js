"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class CreateAppointments1602952628609 {
    async up(queryRunner) {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'appointments',
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
                    name: 'provider_id',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'date',
                    type: 'timestamp with time zone',
                    isNullable: false,
                },
                {
                    name: 'eventImage',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'tickets',
                    type: 'numeric',
                    isNullable: false,
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
    }
    async down(queryRunner) {
        await queryRunner.dropTable('appointments');
    }
}
exports.default = CreateAppointments1602952628609;
//# sourceMappingURL=1602952628609-CreateAppointments.js.map