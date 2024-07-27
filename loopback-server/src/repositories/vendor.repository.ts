import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Vendor, VendorRelations, Purchase} from '../models';
import {FarmDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PurchaseRepository} from './purchase.repository';

export class VendorRepository extends DefaultCrudRepository<
  Vendor,
  typeof Vendor.prototype.vendor_id,
  VendorRelations
> {

  public readonly purchases: HasManyRepositoryFactory<Purchase, typeof Vendor.prototype.vendor_id>;

  constructor(
    @inject('datasources.farm') dataSource: FarmDataSource, @repository.getter('PurchaseRepository') protected purchaseRepositoryGetter: Getter<PurchaseRepository>,
  ) {
    super(Vendor, dataSource);
    this.purchases = this.createHasManyRepositoryFactoryFor('purchases', purchaseRepositoryGetter,);
  }
}
