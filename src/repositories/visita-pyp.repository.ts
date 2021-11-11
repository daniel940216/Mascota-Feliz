import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {VisitaPyp, VisitaPypRelations} from '../models';

export class VisitaPypRepository extends DefaultCrudRepository<
  VisitaPyp,
  typeof VisitaPyp.prototype.id,
  VisitaPypRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(VisitaPyp, dataSource);
  }
}
