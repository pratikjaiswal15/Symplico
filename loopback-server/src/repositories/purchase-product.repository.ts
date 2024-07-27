import { DefaultCrudRepository, repository, BelongsToAccessor } from '@loopback/repository';
import { PurchaseProduct, PurchaseProductRelations, Purchase, Product } from '../models';
import { FarmDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { PurchaseRepository } from './purchase.repository';
import { ProductRepository } from './product.repository';

export class PurchaseProductRepository extends DefaultCrudRepository<
  PurchaseProduct,
  typeof PurchaseProduct.prototype.id,
  PurchaseProductRelations
  > {

  public readonly purchase: BelongsToAccessor<Purchase, typeof PurchaseProduct.prototype.id>;

  public readonly product: BelongsToAccessor<Product, typeof PurchaseProduct.prototype.id>;

  constructor(
    @inject('datasources.farm') dataSource: FarmDataSource, @repository.getter('PurchaseRepository') protected purchaseRepositoryGetter: Getter<PurchaseRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(PurchaseProduct, dataSource);
    this.product = this.createBelongsToAccessorFor('products', productRepositoryGetter);
    this.registerInclusionResolver('products', this.product.inclusionResolver);
    this.purchase = this.createBelongsToAccessorFor('purchases', purchaseRepositoryGetter);
    this.registerInclusionResolver('purchases', this.purchase.inclusionResolver);
  }
}
