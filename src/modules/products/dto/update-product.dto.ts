import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    prodName: string;

    @IsString()
    @IsOptional()
    code: string;

    @IsString()
    @IsOptional()
    imageUrl: string;

    @IsString()
    @IsOptional()
    sku: string;

    @IsString()
    @IsOptional()
    price: number;

    @IsOptional()
    @IsString()
    isActive: string;

    @IsString()
    @IsOptional()
    categoryId: number;
}
