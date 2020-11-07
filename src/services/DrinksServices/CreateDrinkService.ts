import { Service } from 'typedi';
import { Connection } from 'typeorm';
import Drink from '../../models/Drink.entity';
import DrinksRepository from '../../repositories/DrinksRepository';

interface Request {
    name: string;
    product_brand: string;
    quantity: number;
}

@Service()
class CreateDrinkService {
    private drinksRepository: DrinksRepository;

    constructor(private readonly connection: Connection) {
        this.drinksRepository = this.connection.getCustomRepository(
            DrinksRepository,
        );
    }

    public async execute({
        name,
        product_brand,
        quantity,
    }: Request): Promise<Drink> {
        const nameOfDrink = name.toLowerCase();
        const productBrandOfDrink = product_brand.toLowerCase();

        const verifyAlreadyExistanceDrinkName = await this.drinksRepository.findOne(
            { where: { name: nameOfDrink } },
        );

        const verifyAlreadyExistanceProductBrand = await this.drinksRepository.findOne(
            { where: { product_brand: productBrandOfDrink } },
        );

        if (
            verifyAlreadyExistanceDrinkName &&
            verifyAlreadyExistanceProductBrand
        ) {
            throw new Error('Drink already exists');
        }

        const drink = this.drinksRepository.create({
            name: nameOfDrink,
            product_brand: productBrandOfDrink,
            quantity,
        });

        await this.drinksRepository.save(drink);

        return drink;
    }
}

export default CreateDrinkService;
