import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";

console.log("Creeaysiduyeuiydf");

export class CreateProductDto {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @IsNotEmpty()
    prodName: string;

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsOptional()
    @IsString()
    imageUrl: string;

    @IsString()
    @IsNotEmpty()
    sku: string;

    @IsString()
    @IsNotEmpty()
    price: number;

    @IsOptional()
    @IsString()
    isActive: boolean;

    @IsString()
    @IsNotEmpty()
    categoryId: number;
}