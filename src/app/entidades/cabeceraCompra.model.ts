import { UserLogeado } from './userLogeado.model';
import { CompraDetalle } from './compraDetallePojo.model';

export interface CabeceraCompra {
    codigocompra?: number;
    usuario?: UserLogeado;
    fechacompra?: Date;
    detalle?: CompraDetalle[];
    costoTotal?: number;
}