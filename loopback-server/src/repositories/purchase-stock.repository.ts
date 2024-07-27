import { DefaultCrudRepository, repository, BelongsToAccessor } from '@loopback/repository';
import { PurchaseStock, PurchaseStockRelations, Product } from '../models';
import { FarmDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { ProductRepository } from './product.repository';

export class PurchaseStockRepository extends DefaultCrudRepository<
  PurchaseStock,
  typeof PurchaseStock.prototype.purchase_stock_id,
  PurchaseStockRelations
  > {

  public readonly product: BelongsToAccessor<Product, typeof PurchaseStock.prototype.purchase_stock_id>;

  constructor(
    @inject('datasources.farm') dataSource: FarmDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(PurchaseStock, dataSource);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
  }
}
