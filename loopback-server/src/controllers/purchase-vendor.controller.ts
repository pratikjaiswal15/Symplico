import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Purchase,
  Vendor,
} from '../models';
import { PurchaseRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';


@authenticate('jwt')
export class PurchaseVendorController {
  constructor(
    @repository(PurchaseRepository)
    public purchaseRepository: PurchaseRepository,
  ) { }

  @get('/purchases/{id}/vendor', {
    responses: {
      '200': {
        description: 'Vendor belonging to Purchase',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Vendor) },
          },
        },
      },
    },
  })
  async getVendor(
    @param.path.string('id') id: typeof Purchase.prototype.purchase_id,
  ): Promise<Vendor> {
    return this.purchaseRepository.vendor(id);
  }
}
