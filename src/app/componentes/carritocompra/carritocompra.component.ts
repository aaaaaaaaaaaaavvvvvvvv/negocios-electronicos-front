import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PurchaseUnit } from 'src/app/entidades/purchaseUnits.model';
import { VariableGlobalServicio } from 'src/app/servicios/variableGlobal.service';
import { CarritoCompra } from 'src/app/entidades/carritocompra.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CompraPojo } from 'src/app/entidades/compraPojo.model';
import { CompraDetalle } from 'src/app/entidades/compraDetallePojo.model';
import { CompraService } from 'src/app/servicios/compra.service';
import { PushNotificacionService } from 'src/app/servicios/push-notificacion.service';
import { PushNotificacion } from 'src/app/entidades/pushNotificacion.model';
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
  detalleCarrito: CarritoCompra[] = [];
  precioTotal: number = 0;

  paidFor = false;

  constructor(public variableGlobalServicio: VariableGlobalServicio,
    private router: Router,
    private compraService: CompraService,
    private pushNotificacionService: PushNotificacionService) { }

  ngOnInit() {
    this.detalleCarrito = this.variableGlobalServicio.carritoCompraDetalle;
    this.purchaseunitList = this.variableGlobalServicio.purchaseunit;
    console.log('Cargamos la lita general');
    console.log(this.detalleCarrito);
    this.detalleCarrito.forEach((carritoCompra) => {
      this.precioTotal += carritoCompra.producto.precioproducto * carritoCompra.cantidad;
    });


    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: this.precioTotal
              }
            }]
          })
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.paidFor = true;
          console.log(order);
          //Guardar en bd
          let compraPojo: CompraPojo = {
            codigousuario: this.variableGlobalServicio.usuarioGlobal.codigousuario,
            detalleCarrito: []
          };
          this.detalleCarrito.forEach((carritoCompra) => {
            let compraDetalle: CompraDetalle = {
              cantidad: carritoCompra.cantidad,
              codigoproducto: carritoCompra.producto.codigoproducto
            }
            compraPojo.detalleCarrito.push(compraDetalle);
          });
          this.compraService.comprar(compraPojo).subscribe((resultado) => {
            if (resultado == true) {
              if (this.variableGlobalServicio.usuarioGlobal.codigocelular != undefined) {
                //Llamar a cloud message
                let pushNotificacion: PushNotificacion = {
                  codCelular: this.variableGlobalServicio.usuarioGlobal.codigocelular,
                  usuario: this.variableGlobalServicio.usuarioGlobal.codigousuario
                };
                console.log(pushNotificacion);
                this.pushNotificacionService.enviarNotificacion(pushNotificacion).subscribe((pushResponse) => {
                  console.log(pushResponse);
                  if (pushResponse.success == 1) {
                    Swal.fire('Compra confirmada', 'Los productos pedidos serán enviados en la brevedad posible', 'success').then((resultado) => {
                      this.router.navigate(['/']);
                    })
                  }
                  else {
                    Swal.fire('Dispositivo movil no encontrado', 'Algo pasó con su dispositivo movil asociado, contacte a Guti para que le solucione el problema :s. Si no tiene ninguno asociado, ignore este mensaje', 'error');
                  }
                  this.variableGlobalServicio.carritoCompraDetalle = [];
                  this.variableGlobalServicio.cantidadArticulos = 0;
                  this.variableGlobalServicio.purchaseunit = undefined;

                });
              }
              else{
                console.log('El usuario no ha registrado dispositivo movil');
              } 

            }
            else {
              Swal.fire('Compra incompleta', 'Algo pasó en nuestros servidores, contacte a Guti para que le solucione el problema :s', 'error');
            }
          });
        },
        onError: err => {
          console.log(err);
        }
      }).render(this.paypalElement.nativeElement);
  }


}
