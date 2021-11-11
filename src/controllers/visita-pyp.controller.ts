import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {VisitaPyp} from '../models';
import {VisitaPypRepository} from '../repositories';

export class VisitaPypController {
  constructor(
    @repository(VisitaPypRepository)
    public visitaPypRepository : VisitaPypRepository,
  ) {}

  @post('/visita-pyps')
  @response(200, {
    description: 'VisitaPyp model instance',
    content: {'application/json': {schema: getModelSchemaRef(VisitaPyp)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaPyp, {
            title: 'NewVisitaPyp',
            exclude: ['id'],
          }),
        },
      },
    })
    visitaPyp: Omit<VisitaPyp, 'id'>,
  ): Promise<VisitaPyp> {
    return this.visitaPypRepository.create(visitaPyp);
  }

  @get('/visita-pyps/count')
  @response(200, {
    description: 'VisitaPyp model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VisitaPyp) where?: Where<VisitaPyp>,
  ): Promise<Count> {
    return this.visitaPypRepository.count(where);
  }

  @get('/visita-pyps')
  @response(200, {
    description: 'Array of VisitaPyp model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VisitaPyp, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VisitaPyp) filter?: Filter<VisitaPyp>,
  ): Promise<VisitaPyp[]> {
    return this.visitaPypRepository.find(filter);
  }

  @patch('/visita-pyps')
  @response(200, {
    description: 'VisitaPyp PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaPyp, {partial: true}),
        },
      },
    })
    visitaPyp: VisitaPyp,
    @param.where(VisitaPyp) where?: Where<VisitaPyp>,
  ): Promise<Count> {
    return this.visitaPypRepository.updateAll(visitaPyp, where);
  }

  @get('/visita-pyps/{id}')
  @response(200, {
    description: 'VisitaPyp model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VisitaPyp, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(VisitaPyp, {exclude: 'where'}) filter?: FilterExcludingWhere<VisitaPyp>
  ): Promise<VisitaPyp> {
    return this.visitaPypRepository.findById(id, filter);
  }

  @patch('/visita-pyps/{id}')
  @response(204, {
    description: 'VisitaPyp PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaPyp, {partial: true}),
        },
      },
    })
    visitaPyp: VisitaPyp,
  ): Promise<void> {
    await this.visitaPypRepository.updateById(id, visitaPyp);
  }

  @put('/visita-pyps/{id}')
  @response(204, {
    description: 'VisitaPyp PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() visitaPyp: VisitaPyp,
  ): Promise<void> {
    await this.visitaPypRepository.replaceById(id, visitaPyp);
  }

  @del('/visita-pyps/{id}')
  @response(204, {
    description: 'VisitaPyp DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.visitaPypRepository.deleteById(id);
  }
}
