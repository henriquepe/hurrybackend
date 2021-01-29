import { Connection } from 'typeorm';
import Drink from '@modules/Drinks/infra/typeorm/entities/Drink.entity';
import DrinksRepository from '@modules/Drinks/infra/typeorm/repositories/DrinksRepository';

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
