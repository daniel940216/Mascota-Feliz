import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cliente,
  Rol,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteRolController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/rol', {
    responses: {
      '200': {
        description: 'Rol belonging to Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rol)},
          },
        },
      },
    },
  })
  async getRol(
    @param.path.string('id') id: typeof Cliente.prototype.id,
  ): Promise<Rol> {
    return this.clienteRepository.rol(id);
  }
}
