import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';

import MusicStyle from '../entities/MusicStyle.entity';

@Service()
@EntityRepository(MusicStyle)
// eslint-disable-next-line prettier/prettier
export default class MusicStylesRepository extends Repository<MusicStyle> { }
