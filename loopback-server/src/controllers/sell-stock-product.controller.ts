import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SellStock,
  Product,
} from '../models';
import { SellStockRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';


@authenticate('jwt')
export class SellStockProductController {
  constructor(
    @repository(SellStockRepository)
    public sellStockRepository: SellStockRepository,
  ) { }

  @get('/sell-stocks/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to SellStock',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Product) },
          },
        },
      },
    },
  })
  async getProduct(
    @param.path.number('id') id: typeof SellStock.prototype.sell_stock_id,
  ): Promise<Product> {
    return this.sellStockRepository.product(id);
  }
}
