import { DefaultCrudRepository, repository, BelongsToAccessor } from '@loopback/repository';
import { Cart, CartRelations, Users, Product } from '../models';
import { FarmDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { UsersRepository } from './users.repository';
import { ProductRepository } from './product.repository';

export class CartRepository extends DefaultCrudRepository<
  Cart,
  typeof Cart.prototype.cart_id,
  CartRelations
  > {

  public readonly users: BelongsToAccessor<Users, typeof Cart.prototype.cart_id>;

  public readonly product: BelongsToAccessor<Product, typeof Cart.prototype.cart_id>;

  constructor(
    @inject('datasources.farm') dataSource: FarmDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Cart, dataSource);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter);
    this.registerInclusionResolver('product', this.product.inclusionResolver);

    this.users = this.createBelongsToAccessorFor('users', usersRepositoryGetter);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
