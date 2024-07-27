import { DefaultCrudRepository, repository, BelongsToAccessor } from '@loopback/repository';
import { SellStock, SellStockRelations, Product } from '../models';
import { FarmDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { ProductRepository } from './product.repository';

export class SellStockRepository extends DefaultCrudRepository<
  SellStock,
  typeof SellStock.prototype.sell_stock_id,
  SellStockRelations
  > {

  public readonly product: BelongsToAccessor<Product, typeof SellStock.prototype.sell_stock_id>;

  constructor(
    @inject('datasources.farm') dataSource: FarmDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(SellStock, dataSource);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
  }
}
