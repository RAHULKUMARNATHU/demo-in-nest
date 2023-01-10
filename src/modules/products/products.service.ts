import { Injectable, InternalServerErrorException, NotFoundException, Res } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IProduct } from '../../interfaces/product.interface';
import * as fs from 'fs';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product)private productRepository: Repository<Product>){}

  // Create new product
  async create(createProductDto: CreateProductDto):Promise<Product>{  
    const newProducts = await this.productRepository.create(createProductDto);
    this.productRepository.save(newProducts);
    if(!newProducts){
      throw new console.error('Ohh, Product could not be created');
    }
    return newProducts;
  }

  // Find all products
  async allProducts():Promise<Product[]>{
    const products = await this.productRepository.find();
    if(!products.length){
      throw new NotFoundException('ohh!! No, Product Exists!');
    }
    return products;
  }

  // Find one Product by Id
  async findProductById(id:number):Promise<Product>{
    const product = await this.productRepository.findOne({ id });
    if(!product){
      throw new NotFoundException('ohh!! Product with this ID does Not Exists!');
    }
    return product; 
  }


  // Remove Product by ID
  async removeProduct(id: number):Promise<Product> {
    const product = await this.productRepository.findOne({ id });
    if(product){
      //Reading the Existing file
      const fileName = product.imageUrl.slice(2);
      const directoryPath = __dirname.slice(0,-21);
      const x = await fs.unlink(`${directoryPath}/${fileName}`, (err) => {
        if (err) {
         console.error(err, 'Error in finding linked image');
         return err;
        }
       })
      //  Deleting the product Image
      return this.productRepository.remove(product);
    }
    throw new NotFoundException('ohh!! Product with this ID does Not Exists!');
  }

  // // Update Product by ID
  async updateProduct(id: string, updateProductDto: UpdateProductDto):Promise<any>{
    const product = await this.findProductById(+id);

    const newData: IProduct = {
      prodName: product.prodName,
      code: product.code,
      imageUrl: product.imageUrl,
      sku: product.sku,
      price: product.price,
      isActive: product.isActive,
      categoryId: product.categoryId
    };
    
    if (updateProductDto.prodName) newData.prodName = updateProductDto.prodName;
    if (updateProductDto.code) newData.code = updateProductDto.code;
    if (updateProductDto.sku) newData.sku = updateProductDto.sku;
    if (updateProductDto.price) newData.price = updateProductDto.price;
    if (updateProductDto.isActive) newData.isActive = JSON.parse(updateProductDto.isActive);
    if (updateProductDto.categoryId) newData.categoryId = updateProductDto.categoryId;
    if (updateProductDto.imageUrl) {
      //Reading the Existing file
      const fileName = newData.imageUrl.slice(2);
      const directoryPath = __dirname.slice(0,-21);
      const x = await fs.unlink(`${directoryPath}/${fileName}`, (err) => {
        if (err) {
         console.error(err, 'Error in finding linked image');
         return err;
        }})
      //Replacing the Old Image 
      newData.imageUrl = updateProductDto.imageUrl;
    }
    const updatedProduct = this.productRepository.update(product,newData);
    return updatedProduct;
  }

  // Render Image on Browser
  async viewImage(id:string, @Res() res){
    return res.sendFile(id, { root: 'uploads'});; 
  }
}
