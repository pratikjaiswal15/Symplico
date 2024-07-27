import { DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor } from '@loopback/repository';
import { Purchase, PurchaseRelations, PurchaseProduct, Vendor } from '../models';
import { FarmDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { PurchaseProductRepository } from './purchase-product.repository';
import { VendorRepository } from './vendor.repository';

export class PurchaseRepository extends DefaultCrudRepository<
  Purchase,
  PurchaseRelations
  > {

  public readonly purchaseProducts: HasManyRepositoryFactory<PurchaseProduct, typeof Purchase.prototype.purchase_id>;

  public readonly vendor: BelongsToAccessor<Vendor, typeof Purchase.prototype.purchase_id>;

  constructor(
    @inject('datasources.farm') dataSource: FarmDataSource, @repository.getter('PurchaseProductRepository') protected purchaseProductRepositoryGetter: Getter<PurchaseProductRepository>, @repository.getter('VendorRepository') protected vendorRepositoryGetter: Getter<VendorRepository>,
  ) {
    super(Purchase, dataSource);
    this.vendor = this.createBelongsToAccessorFor('vendors', vendorRepositoryGetter);
    this.registerInclusionResolver('vendors', this.vendor.inclusionResolver);
    this.purchaseProducts = this.createHasManyRepositoryFactoryFor('purchaseProducts', purchaseProductRepositoryGetter);
    this.registerInclusionResolver('purchaseProducts', this.purchaseProducts.inclusionResolver);

  }
}
