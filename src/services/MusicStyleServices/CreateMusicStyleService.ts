import { Connection } from 'typeorm';
import { Service } from 'typedi';
import MusicStyle from '../../models/MusicStyle.entity';
import MusicStylesRepository from '../../repositories/MusicStylesRepository';

interface Request {
    name: string;
}

@Service()
class CreateMusicStyleService {
    private musicstylesRepository: MusicStylesRepository;

    constructor(private readonly connection: Connection) {
        this.musicstylesRepository = this.connection.getCustomRepository(
            MusicStylesRepository,
        );
    }

    public async execute({ name }: Request): Promise<MusicStyle> {
        const nameToLowerCase = name.toLowerCase();

        const verifyAlreadyExistanceOfMusicStyle = await this.musicstylesRepository.findOne(
            { where: { name: nameToLowerCase } },
        );

        if (verifyAlreadyExistanceOfMusicStyle) {
            throw new Error('This music style already exists');
        }

        const musicStyle = await this.musicstylesRepository.create({
            name: nameToLowerCase,
        });

        await this.musicstylesRepository.save(musicStyle);

        return musicStyle;
    }
}

export default CreateMusicStyleService;
