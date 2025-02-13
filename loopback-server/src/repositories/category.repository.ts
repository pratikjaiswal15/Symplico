import { DefaultCrudRepository, repository, HasManyRepositoryFactory } from '@loopback/repository';
import { Category, CategoryRelations, Product} from '../models';
import { FarmDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import {ProductRepository} from './product.repository';

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.category_id,
  CategoryRelations
  > {

  public readonly products: HasManyRepositoryFactory<Product, typeof Category.prototype.category_id>;

  constructor(
    @inject('datasources.farm') dataSource: FarmDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Category, dataSource);
    this.products = this.createHasManyRepositoryFactoryFor('products', productRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
    //    this.subCategories = this.createHasManyRepositoryFactoryFor('subCategories', subCategoryRepositoryGetter,);
  }
}
