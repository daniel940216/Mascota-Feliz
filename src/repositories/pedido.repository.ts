import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pedido, PedidoRelations, Cliente, Producto, PedidoProducto} from '../models';
import {ClienteRepository} from './cliente.repository';
import {PedidoProductoRepository} from './pedido-producto.repository';
import {ProductoRepository} from './producto.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.id,
  PedidoRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Pedido.prototype.id>;

  public readonly productos: HasManyThroughRepositoryFactory<Producto, typeof Producto.prototype.id,
          PedidoProducto,
          typeof Pedido.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('PedidoProductoRepository') protected pedidoProductoRepositoryGetter: Getter<PedidoProductoRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Pedido, dataSource);
    this.productos = this.createHasManyThroughRepositoryFactoryFor('productos', productoRepositoryGetter, pedidoProductoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
