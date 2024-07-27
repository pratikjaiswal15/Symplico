import { DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory } from '@loopback/repository';
import { Users, UsersRelations, Address, Cart, Orders } from '../models';
import { FarmDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
//import { RetailerRepository } from './retailer.repository';
//import { CustomerRepository } from './customer.repository';
//import { HotelRepository } from './hotel.repository';
import { AddressRepository } from './address.repository';
import { CartRepository } from './cart.repository';
import { OrdersRepository } from './orders.repository';



export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
  > {



  public readonly addresses: HasManyRepositoryFactory<Address, typeof Users.prototype.id>;

  public readonly carts: HasManyRepositoryFactory<Cart, typeof Users.prototype.id>;

  public readonly orders: HasManyRepositoryFactory<Orders, typeof Users.prototype.id>;

  constructor(
    @inject('datasources.farm') dataSource: FarmDataSource, @repository.getter('AddressRepository') protected addressRepositoryGetter: Getter<AddressRepository>, @repository.getter('CartRepository') protected cartRepositoryGetter: Getter<CartRepository>, @repository.getter('OrdersRepository') protected ordersRepositoryGetter: Getter<OrdersRepository>,
  ) {
    super(Users, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', ordersRepositoryGetter);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
    this.carts = this.createHasManyRepositoryFactoryFor('carts', cartRepositoryGetter);
    this.registerInclusionResolver('carts', this.carts.inclusionResolver);
    this.addresses = this.createHasManyRepositoryFactoryFor('addresses', addressRepositoryGetter);
    this.registerInclusionResolver('addresses', this.addresses.inclusionResolver);

  }



}
