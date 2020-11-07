import { Connection } from 'typeorm';
import Drink from '../../models/Drink.entity';
import DrinksRepository from '../../repositories/DrinksRepository';

class ListDrinksService {
    private drinksRepository: DrinksRepository;

    constructor(private readonly connection: Connection) {
        this.drinksRepository = this.connection.getCustomRepository(
            DrinksRepository,
        );
    }

    public async execute(): Promise<Drink[]> {
        const list = await this.drinksRepository.find();

        return list;
    }
}

export default ListDrinksService;
