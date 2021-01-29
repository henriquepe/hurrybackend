import AWS from 'aws-sdk';
import { Connection, getRepository } from 'typeorm';
import Post from '@modules/Posts/infra/typeorm/entities/Post.entity';
import AppointmentsRepository from '@modules/Appointments/infra/typeorm/repositories/AppointmentsRepository';

interface Request {
    id: string;
    name: string;
    size: number;
    key: string;
    url: string;
}

class UpdateEventImageService {
    private appointmentsRepository: AppointmentsRepository;

    constructor(private readonly connection: Connection) {
        this.appointmentsRepository = this.connection.getCustomRepository(
            AppointmentsRepository,
        );
    }

    public async execute({ id, name, key, size, url }: Request): Promise<Post> {
        const appointment = await this.appointmentsRepository.findOne(id);

        const postsRepository = getRepository(Post, 'default');

        const s3 = new AWS.S3();

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
            throw new Error(
                'Appointment not found, please verify the appointment ID',
            );
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
        } else {
            throw new Error('Post not found');
        }

        await this.appointmentsRepository.save(appointment);

        return post;
    }
}

export default UpdateEventImageService;
