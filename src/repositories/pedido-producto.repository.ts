import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PedidoProducto, PedidoProductoRelations} from '../models';

export class PedidoProductoRepository extends DefaultCrudRepository<
  PedidoProducto,
  typeof PedidoProducto.prototype.id,
  PedidoProductoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(PedidoProducto, dataSource);
  }
}
