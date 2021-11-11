import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Plan, PlanRelations, Mascota} from '../models';
import {MascotaRepository} from './mascota.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.id,
  PlanRelations
> {

  public readonly mascota: BelongsToAccessor<Mascota, typeof Plan.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Plan, dataSource);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}
