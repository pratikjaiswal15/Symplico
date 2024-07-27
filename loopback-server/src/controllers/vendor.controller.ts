import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Vendor } from '../models';
import { VendorRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';


@authenticate('jwt')
export class VendorController {
  constructor(
    @repository(VendorRepository)
    public vendorRepository: VendorRepository,
  ) { }

  @post('/vendors', {
    responses: {
      '200': {
        description: 'Vendor model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Vendor) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vendor, { exclude: ['vendor_id'] }),
        },
      },
    })
    vendor: Omit<Vendor, 'vendor_id'>,
  ): Promise<Vendor> {
    return this.vendorRepository.create(vendor);
  }

  @get('/vendors/count', {
    responses: {
      '200': {
        description: 'Vendor model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })

  async count(
    @param.query.object('where', getWhereSchemaFor(Vendor)) where?: Where<Vendor>,
  ): Promise<Count> {
    return this.vendorRepository.count(where);
  }

  @get('/vendors', {
    responses: {
      '200': {
        description: 'Array of Vendor model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Vendor) },
          },
        },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Vendor)) filter?: Filter<Vendor>,
  ): Promise<Vendor[]> {
    return this.vendorRepository.find(filter);
  }

  @patch('/vendors', {
    responses: {
      '200': {
        description: 'Vendor PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vendor, { partial: true }),
        },
      },
    })
    vendor: Vendor,
    @param.query.object('where', getWhereSchemaFor(Vendor)) where?: Where<Vendor>,
  ): Promise<Count> {
    return this.vendorRepository.updateAll(vendor, where);
  }

  @get('/vendors/{id}', {
    responses: {
      '200': {
        description: 'Vendor model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Vendor) } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Vendor> {
    return this.vendorRepository.findById(id);
  }

  @patch('/vendors/{id}', {
    responses: {
      '204': {
        description: 'Vendor PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vendor, { partial: true }),
        },
      },
    })
    vendor: Vendor,
  ): Promise<void> {
    await this.vendorRepository.updateById(id, vendor);
  }

  @put('/vendors/{id}', {
    responses: {
      '204': {
        description: 'Vendor PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() vendor: Vendor,
  ): Promise<void> {
    await this.vendorRepository.replaceById(id, vendor);
  }

  @del('/vendors/{id}', {
    responses: {
      '204': {
        description: 'Vendor DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.vendorRepository.deleteById(id);
  }

  @get('/vendor_autocomplete/{search}', {
    responses: {
      '200': {
        description: 'Array of Vendor model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Vendor) },
          },
        },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async find_limit(
    @param.path.string('search') search: string,
    @param.query.object('filter', getFilterSchemaFor(Vendor)) filter?: Filter<Vendor>,
  ): Promise<Vendor[]> {
    return this.vendorRepository.find({
      where: { name: { regexp: search } },
      fields: { vendor_id: true, name: true, mobile_no: true },
      limit: 10
    })

  }

  @get('/five_vendors', {
    responses: {
      '200': {
        description: 'Array of Vendor model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Vendor) },
          },
        },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async find_five(
    @param.query.object('filter', getFilterSchemaFor(Vendor)) filter?: Filter<Vendor>,
  ): Promise<Vendor[]> {
    return this.vendorRepository.find({
      limit: 5,
      fields: { name: true, vendor_id: true, mobile_no: true },
    });
  }



}
