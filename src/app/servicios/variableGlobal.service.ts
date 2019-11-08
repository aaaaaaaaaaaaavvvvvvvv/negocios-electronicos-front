import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from '../entidades/producto.model';
import { Observable } from 'rxjs';
import { PurchaseUnit } from '../entidades/purchaseUnits.model';
import { CarritoCompra } from '../entidades/carritocompra.model';

@Injectable()
export class VariableGlobalServicio {

    purchaseunit: PurchaseUnit[]=[];
    carritoCompraDetalle: CarritoCompra[]=[];

   constructor(){

   }

}