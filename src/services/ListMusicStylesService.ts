import { Connection } from 'typeorm';
import { Service } from 'typedi';

import MusicStylesRepository from '../repositories/MusicStylesRepository';
import MusicStyle from '../models/MusicStyle.entity';

@Service()
class ListMusicStyleService {
    private musicstylesRepository: MusicStylesRepository;

    constructor(private readonly connection: Connection) {
        this.musicstylesRepository = this.connection.getCustomRepository(
            MusicStylesRepository,
        );
    }

    public async execute(): Promise<MusicStyle[]> {
        const musicStylesList = await this.musicstylesRepository.find();

        return musicStylesList;
    }
}

export default ListMusicStyleService;
