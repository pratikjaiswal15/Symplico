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
import { Address } from '../models';
import { AddressRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';

@authenticate('jwt')


export class AddressController {
  constructor(
    @repository(AddressRepository)
    public addressRepository: AddressRepository,
  ) { }

  @post('/addresses', {
    responses: {
      '200': {
        description: 'Address model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Address) } },
      },
    },
  })

  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {
            title: 'NewAddress',
            exclude: ['address_id'],
          }),
        },
      },
    })
    address: Omit<Address, 'address_id'>,
  ): Promise<Address> {
    return this.addressRepository.create(address);
  }

  @get('/addresses/count', {
    responses: {
      '200': {
        description: 'Address model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async count(
    @param.query.object('where', getWhereSchemaFor(Address)) where?: Where<Address>,
  ): Promise<Count> {
    return this.addressRepository.count(where);
  }

  @authorize({ allowedRoles: ['admin'] })

  @get('/addresses', {
    responses: {
      '200': {
        description: 'Array of Address model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Address) },
          },
        },
      },
    },
  })

  async find(
    @param.query.object('filter', getFilterSchemaFor(Address)) filter?: Filter<Address>,
  ): Promise<Address[]> {
    return this.addressRepository.find(filter);
  }


  @patch('/addresses', {
    responses: {
      '200': {
        description: 'Address PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, { partial: true }),
        },
      },
    })
    address: Address,
    @param.query.object('where', getWhereSchemaFor(Address)) where?: Where<Address>,
  ): Promise<Count> {
    return this.addressRepository.updateAll(address, where);
  }

  @get('/addresses/{id}', {
    responses: {
      '200': {
        description: 'Address model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Address) } },
      },
    },
  })

  @authorize({ allowedRoles: ['admin', 'user'] })
  async findById(@param.path.number('id') id: number): Promise<Address> {
    return this.addressRepository.findById(id);
  }

  @patch('/addresses/{id}', {
    responses: {
      '204': {
        description: 'Address PATCH success',
      },
    },
  })

  @authorize({ allowedRoles: ['admin', 'user'] })

  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, { partial: true }),
        },
      },
    })
    address: Address,
  ): Promise<void> {
    await this.addressRepository.updateById(id, address);
  }

  @put('/addresses/{id}', {
    responses: {
      '204': {
        description: 'Address PUT success',
      },
    },
  })

  @authorize({ allowedRoles: ['admin', 'user'] })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() address: Address,
  ): Promise<void> {
    await this.addressRepository.replaceById(id, address);
  }

  @del('/addresses/{id}', {
    responses: {
      '204': {
        description: 'Address DELETE success',
      },
    },
  })

  @authorize({ allowedRoles: ['admin', 'user'] })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.addressRepository.deleteById(id);
  }
}
