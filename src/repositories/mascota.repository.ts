import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, Cliente, Empleado, VisitaPyp, Plan} from '../models';
import {ClienteRepository} from './cliente.repository';
import {VisitaPypRepository} from './visita-pyp.repository';
import {EmpleadoRepository} from './empleado.repository';
import {PlanRepository} from './plan.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Mascota.prototype.id>;

  public readonly empleados: HasManyThroughRepositoryFactory<Empleado, typeof Empleado.prototype.id,
          VisitaPyp,
          typeof Mascota.prototype.id
        >;

  public readonly plans: HasManyRepositoryFactory<Plan, typeof Mascota.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('VisitaPypRepository') protected visitaPypRepositoryGetter: Getter<VisitaPypRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(Mascota, dataSource);
    this.plans = this.createHasManyRepositoryFactoryFor('plans', planRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
    this.empleados = this.createHasManyThroughRepositoryFactoryFor('empleados', empleadoRepositoryGetter, visitaPypRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
