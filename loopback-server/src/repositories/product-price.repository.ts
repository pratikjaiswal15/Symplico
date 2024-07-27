import { DefaultCrudRepository } from '@loopback/repository';
import { ProductPrice, ProductPriceRelations } from '../models';
import { FarmDataSource } from '../datasources';
import { inject } from '@loopback/core';


export class ProductPriceRepository extends DefaultCrudRepository<
  ProductPrice,
  typeof ProductPrice.prototype.id,
  ProductPriceRelations
  > {

  constructor(
    @inject('datasources.farm') dataSource: FarmDataSource,
  ) {
    super(ProductPrice, dataSource);

  }
}
