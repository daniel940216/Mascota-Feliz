import {Entity, model, property} from '@loopback/repository';

@model()
export class PedidoProducto extends Entity {
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
  idPedido: string;

  @property({
    type: 'string',
    required: true,
  })
  idProducto: string;

  @property({
    type: 'string',
  })
  pedidoId?: string;

  @property({
    type: 'string',
  })
  productoId?: string;

  constructor(data?: Partial<PedidoProducto>) {
    super(data);
  }
}

export interface PedidoProductoRelations {
  // describe navigational properties here
}

export type PedidoProductoWithRelations = PedidoProducto & PedidoProductoRelations;
