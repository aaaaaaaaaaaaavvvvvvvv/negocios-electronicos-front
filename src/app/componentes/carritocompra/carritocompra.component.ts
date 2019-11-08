import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PurchaseUnit } from 'src/app/entidades/purchaseUnits.model';
import { VariableGlobalServicio } from 'src/app/servicios/variableGlobal.service';
import { CarritoCompra } from 'src/app/entidades/carritocompra.model';

declare var paypal;

@Component({
  selector: 'app-carritocompra',
  templateUrl: './carritocompra.component.html',
  styleUrls: ['./carritocompra.component.css']
})
export class CarritocompraComponent implements OnInit {

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  product = {
    price: 888.88,
    description: 'Chikchiquicha',
    img: 'https://i.ytimg.com/vi/n_KrxgXrU4w/maxresdefault.jpg'
  }

  purchaseunitList?: PurchaseUnit[] = [];
  purchaseunit?: PurchaseUnit = {
    description: '',
    amount: {
      currency_code: '',
      value: 0
    }
  };
  detalleCarrito: CarritoCompra[]=[];


  paidFor = false;

  constructor(private variableGlobalServicio: VariableGlobalServicio) { }

  ngOnInit() {
    this.detalleCarrito = this.variableGlobalServicio.carritoCompraDetalle;
    this.purchaseunitList = this.variableGlobalServicio.purchaseunit;
    console.log('Cargamos la lita general');
    console.log(this.detalleCarrito);
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: this.purchaseunitList
          })
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.paidFor = true;
          console.log(order);
        },
        onError: err => {
          console.log(err);
        }
      }).render(this.paypalElement.nativeElement);
  }

}
