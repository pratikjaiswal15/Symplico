import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Stock,
  Product,
} from '../models';
import { StockRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';


@authenticate('jwt')
export class StockProductController {
  constructor(
    @repository(StockRepository)
    public stockRepository: StockRepository,
  ) { }

  @get('/stocks/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to Stock',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Product) },
          },
        },
      },
    },
  })
  async getProduct(
    @param.path.number('id') id: typeof Stock.prototype.stock_id,
  ): Promise<Product> {
    return this.stockRepository.product(id);
  }
}
