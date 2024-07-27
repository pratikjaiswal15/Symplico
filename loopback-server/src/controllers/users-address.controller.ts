import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Users,
  Address,
} from '../models';
import { UsersRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';


@authenticate('jwt')
export class UsersAddressController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/addresses', {
    responses: {
      '200': {
        description: 'Array of Address\'s belonging to Users',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Address) },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Address>,
  ): Promise<Address[]> {
    return this.usersRepository.addresses(id).find(filter);
  }

  @post('/users/{id}/addresses', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Address) } },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Users.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {
            title: 'NewAddressInUsers',
            exclude: ['address_id'],
            optional: ['user_id']
          }),
        },
      },
    }) address: Omit<Address, 'address_id'>,
  ): Promise<Address> {
    return this.usersRepository.addresses(id).create(address);
  }

  @patch('/users/{id}/addresses/{a_id}', {
    responses: {
      '200': {
        description: 'Users.Address PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @param.path.number('a_id') a_id: number,

    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, { partial: true }),
        },
      },
    })
    address: Partial<Address>,
    //   @param.query.object('where', getWhereSchemaFor(Address)) where?: Where<Address>,
  ): Promise<Count> {
    return this.usersRepository.addresses(id).patch(address, { address_id: a_id });
  }

  @patch('/users/{id}/addresses', {
    responses: {
      '200': {
        description: 'Users.Address PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patchWithid(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, { partial: true }),
        },
      },
    })
    address: Partial<Address>,
    @param.query.object('where', getWhereSchemaFor(Address)) where?: Where<Address>,
  ): Promise<Count> {
    return this.usersRepository.addresses(id).patch(address, where);
  }

  @del('/users/{id}/addresses', {
    responses: {
      '200': {
        description: 'Users.Address DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Address)) where?: Where<Address>,
  ): Promise<Count> {
    return this.usersRepository.addresses(id).delete(where);
  }


  @del('/users/{id}/addresses/{a_id}', {
    responses: {
      '200': {
        description: 'Users.Address DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async deletewith_id(
    @param.path.number('id') id: number,
    @param.path.number('a_id') a_id: number,

    //   @param.query.object('where', getWhereSchemaFor(Address)) where?: Where<Address>,
  ): Promise<Count> {
    return this.usersRepository.addresses(id).delete({ address_id: a_id });
  }



  @get('/users/{id}/address/{a_id}', {
    responses: {
      '200': {
        description: 'Array of Address\'s belonging to Users',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Address) },
          },
        },
      },
    },
  })
  async find_one(
    @param.path.number('id') id: number,
    @param.path.number('a_id') a_id: number,

    //  @param.query.object('filter') filter?: Filter<Address>,
  ): Promise<Address[]> {
    return this.usersRepository.addresses(id).find({ where: { address_id: a_id } });
  }

}
