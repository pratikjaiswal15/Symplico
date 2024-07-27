import { DefaultCrudRepository, repository, BelongsToAccessor } from '@loopback/repository';
import { OrderedProducts, OrderedProductsRelations, Product, Orders } from '../models';
import { FarmDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { ProductRepository } from './product.repository';
import { OrdersRepository } from './orders.repository';

export class OrderedProductsRepository extends DefaultCrudRepository<
  OrderedProducts,
  typeof OrderedProducts.prototype.op_id,
  OrderedProductsRelations
  > {

  public readonly product: BelongsToAccessor<Product, typeof OrderedProducts.prototype.op_id>;

  public readonly orders: BelongsToAccessor<Orders, typeof OrderedProducts.prototype.op_id>;

  constructor(
    @inject('datasources.farm') dataSource: FarmDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>, @repository.getter('OrdersRepository') protected ordersRepositoryGetter: Getter<OrdersRepository>,
  ) {
    super(OrderedProducts, dataSource);
    this.orders = this.createBelongsToAccessorFor('orders', ordersRepositoryGetter);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
  }
}
