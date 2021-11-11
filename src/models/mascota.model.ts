import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Empleado} from './empleado.model';
import {VisitaPyp} from './visita-pyp.model';
import {Plan} from './plan.model';

@model()
export class Mascota extends Entity {
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
    type: 'string',
    required: true,
  })
  idEmpleado: string;

  @property({
    type: 'string',
    required: true,
  })
  idPlan: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoAfiliacion: string;

  @property({
    type: 'string',
    required: true,
  })
  motivoInactivo: string;

  @property({
    type: 'string',
    required: true,
  })
  especie: string;

  @property({
    type: 'string',
    required: true,
  })
  raza: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  sexo: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaNac: string;

  @property({
    type: 'string',
    required: true,
  })
  seniales: string;

  @property({
    type: 'string',
    required: true,
  })
  alimento: string;

  @property({
    type: 'number',
    required: true,
  })
  peso: number;

  @property({
    type: 'string',
    required: true,
  })
  enfermedades: string;

  @property({
    type: 'string',
    required: true,
  })
  obsEnfPre: string;

  @property({
    type: 'string',
  })
  foto?: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasMany(() => Empleado, {through: {model: () => VisitaPyp}})
  empleados: Empleado[];

  @hasMany(() => Plan)
  plans: Plan[];

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
