import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Producto} from './producto.model';
import {PedidoProducto} from './pedido-producto.model';

@model()
export class Pedido extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  idCliente: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaPedido: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaEntrega: string;

  @property({
    type: 'string',
    required: true,
  })
  formaPago: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoPago: string;

  @property({
    type: 'string',
  })
  observaciones?: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasMany(() => Producto, {through: {model: () => PedidoProducto}})
  productos: Producto[];

  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  // describe navigational properties here
}

export type PedidoWithRelations = Pedido & PedidoRelations;
