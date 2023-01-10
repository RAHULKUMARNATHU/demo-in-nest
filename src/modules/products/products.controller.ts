import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Req, NotFoundException, Res} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // CREATE new PRODUCT
  @Post('createProduct')
  @UseInterceptors(FileInterceptor('imageUrl',{
    storage:diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const ext = extname(file.originalname);
        const genratedFilename = `${Date.now()}${ext}`
        callback(null, genratedFilename)
      }
    })
  }))
  async create(@Req() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto):Promise<Product>{
    var prodObj = { 
      id: createProductDto.id,
      prodName: createProductDto.prodName,
      code: createProductDto.code, 
      imageUrl: file.destination+'/'+file.filename,
      sku: createProductDto.sku,
      price: +createProductDto.price,
      isActive: Boolean(createProductDto.isActive),
      categoryId : +createProductDto.categoryId
    }
    return this.productsService.create(prodObj);
  }

  // GET all products
  @Get('/all_products')
  allProducts():Promise<Product[]>{
    return this.productsService.allProducts();
  }

  // FIND PRODUCT BY ID
  @Get('/prod_by_id/:id')
  findById(@Param('id') params:string):Promise<Product>{
    return this.productsService.findProductById(+params);
  }

  // REMOVE PRODUCT 
  @Delete('/delete_product/:id')
  remove(@Param('id') id: string):Promise<Product>{
    return this.productsService.removeProduct(+id);
  }

  // UPDATE PRODUCTS     
  @Patch('/update_product/:id')
  @UseInterceptors(FileInterceptor('imageUrl',{
    storage:diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const ext = extname(file.originalname);
        const genratedFilename = `${Date.now()}${ext}`
        callback(null, genratedFilename)
      }
    })
  }))
  async update(
    @Param('id') id: string,
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateProductDto: UpdateProductDto):Promise<any>{
      if(file != undefined){
        var prodObj = { 
          prodName: updateProductDto.prodName,
          code: updateProductDto.code, 
          imageUrl: file.destination+'/'+file.filename,
          sku: updateProductDto.sku,
          price: +updateProductDto.price,
          isActive:updateProductDto.isActive,
          categoryId : +updateProductDto.categoryId
        }
      }else{
        var prodObj = { 
          prodName: updateProductDto.prodName,
          code: updateProductDto.code, 
          imageUrl: updateProductDto.imageUrl,
          sku: updateProductDto.sku,
          price: +updateProductDto.price,
          isActive:updateProductDto.isActive,
          categoryId : +updateProductDto.categoryId
        }
      }
      return this.productsService.updateProduct(id, prodObj);
  }

  // Render Image in browser
  @Get('images/:fileId')
  async serveImage(@Param('fileId') fileId:string, @Res() res): Promise<any> {
    // const temp = res.sendFile(fileId, { root: 'uploads'});
    return this.productsService.viewImage(fileId, res);
  }

}

