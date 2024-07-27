import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MainCategory, MainCategoryRelations, Category} from '../models';
import {FarmDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CategoryRepository} from './category.repository';

export class MainCategoryRepository extends DefaultCrudRepository<
  MainCategory,
  typeof MainCategory.prototype.main_id,
  MainCategoryRelations
> {

  public readonly categories: HasManyRepositoryFactory<Category, typeof MainCategory.prototype.main_id>;

  constructor(
    @inject('datasources.farm') dataSource: FarmDataSource, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(MainCategory, dataSource);
    this.categories = this.createHasManyRepositoryFactoryFor('categories', categoryRepositoryGetter,);
  }
}
