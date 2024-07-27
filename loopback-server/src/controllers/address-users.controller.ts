import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Address,
  Users,
} from '../models';
import { AddressRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';


@authenticate('jwt')
export class AddressUsersController {
  constructor(
    @repository(AddressRepository)
    public addressRepository: AddressRepository,
  ) { }

  @get('/addresses/{id}/users', {
    responses: {
      '200': {
        description: 'Users belonging to Address',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Users) },
          },
        },
      },
    },
  })
  async getUsers(
    @param.path.number('id') id: typeof Address.prototype.address_id,
  ): Promise<Users> {
    return this.addressRepository.users(id);
  }
}
