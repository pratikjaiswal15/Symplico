import { DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory } from '@loopback/repository';
import { Address, AddressRelations, Users, Orders } from '../models';
import { FarmDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { UsersRepository } from './users.repository';
import { OrdersRepository } from './orders.repository';

export class AddressRepository extends DefaultCrudRepository<
  Address,
  typeof Address.prototype.address_id,
  AddressRelations
  > {

  public readonly users: BelongsToAccessor<Users, typeof Address.prototype.address_id>;

  public readonly orders: HasManyRepositoryFactory<Orders, typeof Address.prototype.address_id>;

  constructor(
    @inject('datasources.farm') dataSource: FarmDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>, @repository.getter('OrdersRepository') protected ordersRepositoryGetter: Getter<OrdersRepository>,
  ) {
    super(Address, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', ordersRepositoryGetter);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
    this.users = this.createBelongsToAccessorFor('users', usersRepositoryGetter);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
