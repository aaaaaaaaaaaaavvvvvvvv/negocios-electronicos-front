import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductosServicios } from 'src/app/servicios/productos.service';
import { Producto } from 'src/app/entidades/producto.model';
import { PurchaseUnit } from 'src/app/entidades/purchaseUnits.model';
import { VariableGlobalServicio } from 'src/app/servicios/variableGlobal.service';
import Swal from 'sweetalert2';
import { CarritoCompra } from 'src/app/entidades/carritocompra.model';

declare var paypal;

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css',
    '../../../assets/karma/css/linearicons.css',
    '../../../assets/karma/css/owl.carousel.css',
    '../../../assets/karma/css/font-awesome.min.css',
    '../../../assets/karma/css/themify-icons.css',
    '../../../assets/karma/css/nice-select.css',
    '../../../assets/karma/css/nouislider.min.css',
    '../../../assets/karma/css/bootstrap.css',
    '../../../assets/karma/css/main.css']
})
export class VentasComponent implements OnInit {

  precioAPagar: number = 0;
  purchaseunitList?: PurchaseUnit[] = [];
  purchaseunit?: PurchaseUnit = {
    description: '',
    amount: {
      currency_code: '',
      value: 0
    }
  };
  carritoDetalleList: CarritoCompra[] = [];
  carritoDetalleObj: CarritoCompra = {
    producto: null,
    cantidad: 0
  };



  constructor(private productoServicio: ProductosServicios,
    private variableGlobalServicio: VariableGlobalServicio) { }
  listaProductos: Producto[] = [];

  ngOnInit() {
    this.purchaseunitList = this.variableGlobalServicio.purchaseunit;
    console.log(this.purchaseunitList);
   this.carritoDetalleList = this.variableGlobalServicio.carritoCompraDetalle;
    this.productoServicio.getProductos().subscribe(
      (productos: Producto[]) => {
        this.listaProductos = productos;
       
      });
  }

  addToCart(i: number) {
    /* Capturar si es la primera vez que entra y la lista de compra esta vacía */
    let precioGuardado = 0;
    if(this.purchaseunitList[0] != undefined){
      precioGuardado = this.purchaseunitList[0].amount.value;
    }

    let producto = this.listaProductos.filter(prod => prod.codigoproducto == i)[0];
    this.precioAPagar = this.precioAPagar + producto.precioproducto + precioGuardado;
    /* Detalle de compra en PayPal */
    this.purchaseunit.description = 'Compra desde GutyNatura';
    this.purchaseunit.amount.currency_code = 'USD';
    this.purchaseunit.amount.value = this.precioAPagar;
    this.purchaseunitList[0] = this.purchaseunit;
    this.variableGlobalServicio.purchaseunit = this.purchaseunitList;
    /* ----- */

    /* Detalle de compra para GutyNatura */
    this.carritoDetalleObj.cantidad = 1;
    this.carritoDetalleObj.producto = producto;
    this.carritoDetalleList.push(this.carritoDetalleObj);
    this.variableGlobalServicio.carritoCompraDetalle = this.carritoDetalleList;
    /* ----- */

    Swal.fire(
      'Se agregó al carrito!',
      '',
      'success'
    )
  
  }


}
