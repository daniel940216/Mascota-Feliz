import {Entity, model, property} from '@loopback/repository';

@model()
export class Empleado extends Entity {
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
  identificacion: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaInicio: string;

  @property({
    type: 'string',
    required: true,
  })
  cargo: string;

  @property({
    type: 'string',
    required: true,
  })
  departamento: string;

  @property({
    type: 'number',
    required: true,
  })
  comision: number;

  @property({
    type: 'string',
    required: true,
  })
  nivel: string;

  @property({
    type: 'string',
  })
  foto?: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  sexo: string;

  @property({
    type: 'string',
    required: true,
  })
  idRol: string;


  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
