import { Component, OnInit } from '@angular/core';
import { ProductosServicios } from 'src/app/servicios/productos.service';
import { Producto } from 'src/app/entidades/producto.model';

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

  constructor(private productoServicio: ProductosServicios) { }
  
  listaProductos: Producto[] = [];

  ngOnInit() {
    this.productoServicio.getProductos().subscribe(
      ( productos: Producto[] ) => {
         this.listaProductos = productos;
        console.log(productos[0]);
      });
  }

}
