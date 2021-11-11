import {Entity, model, property} from '@loopback/repository';

@model()
export class VisitaPyp extends Entity {
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
  idMascota: string;

  @property({
    type: 'string',
    required: true,
  })
  idEmpleado: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaVisita: string;

  @property({
    type: 'string',
  })
  mascotaId?: string;

  @property({
    type: 'string',
  })
  empleadoId?: string;

  constructor(data?: Partial<VisitaPyp>) {
    super(data);
  }
}

export interface VisitaPypRelations {
  // describe navigational properties here
}

export type VisitaPypWithRelations = VisitaPyp & VisitaPypRelations;
