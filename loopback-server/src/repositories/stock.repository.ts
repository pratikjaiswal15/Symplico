import { DefaultCrudRepository, repository, BelongsToAccessor } from '@loopback/repository';
import { Stock, StockRelations, Product } from '../models';
import { FarmDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { ProductRepository } from './product.repository';

export class StockRepository extends DefaultCrudRepository<
  Stock,
  typeof Stock.prototype.stock_id,
  StockRelations
  > {

  public readonly product: BelongsToAccessor<Product, typeof Stock.prototype.stock_id>;

  constructor(
    @inject('datasources.farm') dataSource: FarmDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Stock, dataSource);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
  }
}
