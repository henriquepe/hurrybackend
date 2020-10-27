import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';

import MusicStyle from '../models/MusicStyle.entity';

@Service()
@EntityRepository(MusicStyle)
export default class MusicStylesRepository extends Repository<MusicStyle> {}
