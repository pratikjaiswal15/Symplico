import { DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory } from '@loopback/repository';
import { Orders, OrdersRelations, Users, Address, OrderedProducts } from '../models';
import { FarmDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { UsersRepository } from './users.repository';
import { AddressRepository } from './address.repository';
import { OrderedProductsRepository } from './ordered-products.repository';

export class OrdersRepository extends DefaultCrudRepository<
  Orders,
  typeof Orders.prototype.order_id,
  OrdersRelations
  > {

  public readonly users: BelongsToAccessor<Users, typeof Orders.prototype.order_id>;

  public readonly address: BelongsToAccessor<Address, typeof Orders.prototype.order_id>;

  public readonly orderedProducts: HasManyRepositoryFactory<OrderedProducts, typeof Orders.prototype.order_id>;

  constructor(
    @inject('datasources.farm') dataSource: FarmDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>, @repository.getter('AddressRepository') protected addressRepositoryGetter: Getter<AddressRepository>, @repository.getter('OrderedProductsRepository') protected orderedProductsRepositoryGetter: Getter<OrderedProductsRepository>,
  ) {
    super(Orders, dataSource);
    this.orderedProducts = this.createHasManyRepositoryFactoryFor('orderedProducts', orderedProductsRepositoryGetter);
    this.registerInclusionResolver('orderedProducts', this.orderedProducts.inclusionResolver);
    this.address = this.createBelongsToAccessorFor('address', addressRepositoryGetter);
    this.registerInclusionResolver('address', this.address.inclusionResolver);
    this.users = this.createBelongsToAccessorFor('users', usersRepositoryGetter);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
