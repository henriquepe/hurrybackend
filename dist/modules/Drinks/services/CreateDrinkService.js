"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const DrinksRepository_1 = __importDefault(require("@modules/Drinks/infra/typeorm/repositories/DrinksRepository"));
let CreateDrinkService = class CreateDrinkService {
    constructor(connection) {
        this.connection = connection;
        this.drinksRepository = this.connection.getCustomRepository(DrinksRepository_1.default);
    }
    async execute({ name, product_brand, quantity, }) {
        const nameOfDrink = name.toLowerCase();
        const productBrandOfDrink = product_brand.toLowerCase();
        const verifyAlreadyExistanceDrinkName = await this.drinksRepository.findOne({ where: { name: nameOfDrink } });
        const verifyAlreadyExistanceProductBrand = await this.drinksRepository.findOne({ where: { product_brand: productBrandOfDrink } });
        if (verifyAlreadyExistanceDrinkName &&
            verifyAlreadyExistanceProductBrand) {
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
};
CreateDrinkService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], CreateDrinkService);
exports.default = CreateDrinkService;
//# sourceMappingURL=CreateDrinkService.js.map