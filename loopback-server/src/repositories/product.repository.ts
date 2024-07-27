import { DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory, BelongsToAccessor } from '@loopback/repository';
import { Product, ProductRelations, Purchase, Stock, PurchaseStock, SellStock, OrderedProducts, ProductPrice, Category, PurchaseProduct } from '../models';
import { FarmDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { PurchaseRepository } from './purchase.repository';
import { StockRepository } from './stock.repository';
import { PurchaseStockRepository } from './purchase-stock.repository';
import { SellStockRepository } from './sell-stock.repository';
import { ProductPriceRepository } from './product-price.repository';
import { OrderedProductsRepository } from './ordered-products.repository';
import { CategoryRepository } from './category.repository';
import { PurchaseProductRepository } from './purchase-product.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.product_id,
  ProductRelations
  > {

  public readonly purchases: HasManyRepositoryFactory<Purchase, typeof Product.prototype.product_id>;

  public readonly stocks: HasManyRepositoryFactory<Stock, typeof Product.prototype.product_id>;

  public readonly purchaseStocks: HasManyRepositoryFactory<PurchaseStock, typeof Product.prototype.product_id>;

  public readonly sellStocks: HasManyRepositoryFactory<SellStock, typeof Product.prototype.product_id>;

  public readonly orderedProducts: HasManyRepositoryFactory<OrderedProducts, typeof Product.prototype.product_id>;

  public readonly productPrices: HasOneRepositoryFactory<ProductPrice, typeof Product.prototype.product_id>;

  public readonly category: BelongsToAccessor<Category, typeof Product.prototype.product_id>;

  public readonly purchaseProducts: HasManyRepositoryFactory<PurchaseProduct, typeof Product.prototype.product_id>;

  constructor(
    @inject('datasources.farm') dataSource: FarmDataSource, @repository.getter('PurchaseRepository') protected purchaseRepositoryGetter: Getter<PurchaseRepository>, @repository.getter('StockRepository') protected stockRepositoryGetter: Getter<StockRepository>, @repository.getter('PurchaseStockRepository') protected purchaseStockRepositoryGetter: Getter<PurchaseStockRepository>, @repository.getter('SellStockRepository') protected sellStockRepositoryGetter: Getter<SellStockRepository>, @repository.getter('ProductPriceRepository') protected productPriceRepositoryGetter: Getter<ProductPriceRepository>, @repository.getter('OrderedProductsRepository') protected orderedProductsRepositoryGetter: Getter<OrderedProductsRepository>,
    @repository.getter('ProductPriceRepository') getProductPriceRepository: Getter<ProductPriceRepository>, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>, @repository.getter('PurchaseProductRepository') protected purchaseProductRepositoryGetter: Getter<PurchaseProductRepository>,
  ) {
    super(Product, dataSource);
    this.purchaseProducts = this.createHasManyRepositoryFactoryFor('purchaseProducts', purchaseProductRepositoryGetter);
    this.registerInclusionResolver('purchaseProducts', this.purchaseProducts.inclusionResolver);
    this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter);
    this.registerInclusionResolver('category', this.category.inclusionResolver);
    this.orderedProducts = this.createHasManyRepositoryFactoryFor('orderedProducts', orderedProductsRepositoryGetter);
    this.registerInclusionResolver('orderedProducts', this.orderedProducts.inclusionResolver);


    this.sellStocks = this.createHasManyRepositoryFactoryFor('sellStocks', sellStockRepositoryGetter);
    this.purchaseStocks = this.createHasManyRepositoryFactoryFor('purchaseStocks', purchaseStockRepositoryGetter);
    this.stocks = this.createHasManyRepositoryFactoryFor('stocks', stockRepositoryGetter);


    this.registerInclusionResolver('sell-stocks', this.sellStocks.inclusionResolver);
    this.registerInclusionResolver('purchase-stocks', this.purchaseStocks.inclusionResolver);
    this.registerInclusionResolver('stocks', this.stocks.inclusionResolver);

    this.productPrices = this.createHasOneRepositoryFactoryFor('productPrices', getProductPriceRepository);
    this.registerInclusionResolver('productPrices', this.productPrices.inclusionResolver);

  }
}
