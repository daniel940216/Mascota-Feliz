import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Pedido, Mascota, Rol} from '../models';
import {PedidoRepository} from './pedido.repository';
import {MascotaRepository} from './mascota.repository';
import {RolRepository} from './rol.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof Cliente.prototype.id>;

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Cliente.prototype.id>;

  public readonly rol: BelongsToAccessor<Rol, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(Cliente, dataSource);
    this.rol = this.createBelongsToAccessorFor('rol', rolRepositoryGetter,);
    this.registerInclusionResolver('rol', this.rol.inclusionResolver);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
  }
}
