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
  Rol,
  Cliente,
} from '../models';
import {RolRepository} from '../repositories';

export class RolClienteController {
  constructor(
    @repository(RolRepository) protected rolRepository: RolRepository,
  ) { }

  @get('/rols/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of Rol has many Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.rolRepository.clientes(id).find(filter);
  }

  @post('/rols/{id}/clientes', {
    responses: {
      '200': {
        description: 'Rol model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Rol.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInRol',
            exclude: ['id'],
            optional: ['rolId']
          }),
        },
      },
    }) cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    return this.rolRepository.clientes(id).create(cliente);
  }

  @patch('/rols/{id}/clientes', {
    responses: {
      '200': {
        description: 'Rol.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.rolRepository.clientes(id).patch(cliente, where);
  }

  @del('/rols/{id}/clientes', {
    responses: {
      '200': {
        description: 'Rol.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.rolRepository.clientes(id).delete(where);
  }
}
