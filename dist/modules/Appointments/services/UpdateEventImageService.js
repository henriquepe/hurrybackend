"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const typeorm_1 = require("typeorm");
const Post_entity_1 = __importDefault(require("@modules/Posts/infra/typeorm/entities/Post.entity"));
const AppointmentsRepository_1 = __importDefault(require("@modules/Appointments/infra/typeorm/repositories/AppointmentsRepository"));
class UpdateEventImageService {
    constructor(connection) {
        this.connection = connection;
        this.appointmentsRepository = this.connection.getCustomRepository(AppointmentsRepository_1.default);
    }
    async execute({ id, name, key, size, url }) {
        const appointment = await this.appointmentsRepository.findOne(id);
        const postsRepository = typeorm_1.getRepository(Post_entity_1.default, 'default');
        const s3 = new aws_sdk_1.default.S3();
        if (appointment) {
            const eventImageOfAppointment = await postsRepository.findOne({
                where: { id: appointment.eventImage_id },
            });
            if (eventImageOfAppointment) {
                const eventImageKey = await postsRepository.findOne({
                    where: { key: eventImageOfAppointment.key },
                });
                if (eventImageKey) {
                    s3.deleteObject({
                        Bucket: 'hurryawsbucket',
                        Key: `${eventImageKey.key}`,
                    }).promise();
                }
            }
        }
        if (!appointment) {
            throw new Error('Appointment not found, please verify the appointment ID');
        }
        const post = postsRepository.create({
            name,
            size,
            key,
            url,
        });
        await postsRepository.save(post);
        const alreadyCreatedPost = await postsRepository.findOne({
            where: { key },
        });
        if (alreadyCreatedPost) {
            appointment.eventImage_id = alreadyCreatedPost.id;
            appointment.eventImage_url = alreadyCreatedPost.url;
            this.appointmentsRepository.save(appointment);
        }
        else {
            throw new Error('Post not found');
        }
        await this.appointmentsRepository.save(appointment);
        return post;
    }
}
exports.default = UpdateEventImageService;
//# sourceMappingURL=UpdateEventImageService.js.map