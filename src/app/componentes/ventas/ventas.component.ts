import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductosServicios } from 'src/app/servicios/productos.service';
import { Producto } from 'src/app/entidades/producto.model';
import { PurchaseUnit } from 'src/app/entidades/purchaseUnits.model';

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

  paidFor = false;


  constructor(private productoServicio: ProductosServicios) { }
  listaProductos: Producto[] = [];

  ngOnInit() {

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


    this.productoServicio.getProductos().subscribe(
      (productos: Producto[]) => {
        this.listaProductos = productos;
        console.log(productos[0]);
      });
  }

  addToCart(i:number){
    let producto = this.listaProductos.filter(prod => prod.codigoproducto == i)[0];
    this.purchaseunit.description = producto.descripcionproducto;
    this.purchaseunit.amount.currency_code = 'USD';
    this.purchaseunit.amount.value = producto.precioproducto;
    this.purchaseunitList.push(this.purchaseunit);
    
    console.log('MOSTRAMOS EL PRODUCTO');
    console.log(producto);
  }


}
