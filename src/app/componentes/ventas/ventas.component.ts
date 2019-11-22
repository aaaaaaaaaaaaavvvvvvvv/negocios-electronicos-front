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

  estaLogeado: string = 'S';
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

  precioMinimo: number;
  precioMaximo: number;

  constructor(private productoServicio: ProductosServicios,
    private variableGlobalServicio: VariableGlobalServicio, ) { }
  listaProductosOriginal: Producto[] = [];
  listaProductos: Producto[] = [];

  ngOnInit() {
    //this.estaLogeado = this.variableGlobalServicio.estaLogeado;
    this.purchaseunitList = this.variableGlobalServicio.purchaseunit;
    console.log(this.purchaseunitList);
    this.carritoDetalleList = this.variableGlobalServicio.carritoCompraDetalle;
    this.productoServicio.getProductos().subscribe(
      (productos: Producto[]) => {
        this.listaProductosOriginal = productos;
        this.listaProductos = productos;

      });
  }

  addToCart(producto: Producto) {
    /* Detalle de compra en PayPal */
    this.purchaseunit.description = 'Compra desde GutyNatura';
    this.purchaseunit.amount.currency_code = 'USD';
    this.purchaseunit.amount.value = this.precioAPagar;
    this.purchaseunitList[0] = this.purchaseunit;
    this.variableGlobalServicio.purchaseunit = this.purchaseunitList;
    /* ----- */

    /* Capturar si es la primera vez que entra y la lista de compra esta vacía */
    let precioGuardado = 0;
    if (this.purchaseunitList[0] != undefined) {
      precioGuardado = this.purchaseunitList[0].amount.value;
    }

    //let producto = this.listaProductos.filter(prod => prod.codigoproducto == i)[0];
    this.precioAPagar = this.precioAPagar + producto.precioproducto + precioGuardado;

    /* Detalle de compra para GutyNatura */
    let carritoDetalleObj: CarritoCompra = {
      producto: null,
      cantidad: 0
    };
    carritoDetalleObj.cantidad = 1;
    carritoDetalleObj.producto = producto;
    let index = this.variableGlobalServicio.carritoCompraDetalle.findIndex((carritoCompra) => {
      return carritoCompra.producto.codigoproducto === producto.codigoproducto;
    });
    if (index != -1) {
      this.carritoDetalleList[index].cantidad++;
    } else {
      this.carritoDetalleList.push(carritoDetalleObj);
    }
    this.variableGlobalServicio.carritoCompraDetalle = this.carritoDetalleList;
    this.variableGlobalServicio.cantidadArticulos++;
    /* ----- */

    Swal.fire(
      'Se agregó al carrito!',
      '',
      'success'
    )

  }
  filtrarPorPrecio() {
    let precMin = this.precioMinimo;
    let precMax = this.precioMaximo;
    if (precMin == undefined)
      precMin = 0;
    if (precMax == undefined)
      precMax = 9999999;

    this.listaProductos = this.listaProductosOriginal.filter((producto) => {
      return producto.precioproducto >= precMin
        && producto.precioproducto <= precMax;
    });
  }


}
