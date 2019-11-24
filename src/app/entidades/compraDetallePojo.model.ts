import { Producto } from './producto.model';

export interface CompraDetalle{
    codigoproducto?: number;
    cantidad?: number;
    producto?: Producto;
}