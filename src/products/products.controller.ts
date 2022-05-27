import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  all() {
    return this.productService.all();
  }

  @Get(':id')
  get(@Param('id') id) {
    return this.productService.get(id);
  }

  @Post()
  add(
		@Body('name') name: string,
		@Body('description') description: string,
		@Body('price') price: number,
	) {
    const id = this.productService.add(name, description, price);
		return { id }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    this.productService.update(id, name, description, price);
    return null;
  }

  @Delete(':id')
  delete(
    @Param('id') id: string
  ) {
    this.productService.delete(id);
    return null;
  }

}
