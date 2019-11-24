import { Component, OnInit } from '@angular/core';
import { VariableGlobalServicio } from 'src/app/servicios/variableGlobal.service';
import { CompraService } from 'src/app/servicios/compra.service';
import { CompraPojo } from 'src/app/entidades/compraPojo.model';
import { CabeceraCompra } from 'src/app/entidades/cabeceraCompra.model';

@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.component.html',
  styleUrls: ['./historial-compras.component.css']
})
export class HistorialComprasComponent implements OnInit {

  compras: CabeceraCompra[];
  constructor(public variablesGlobales: VariableGlobalServicio,
    private compraService: CompraService) { }

  ngOnInit() {
    this.recuperarCompras();
  }



  recuperarCompras() {
    const compraPojo: CompraPojo = {
      codigousuario: this.variablesGlobales.usuarioGlobal.codigousuario
    }
    this.compraService.recuperarCompras(compraPojo).subscribe((compras) => {
      this.compras = compras;
      this.compras.forEach((compra, index) => {
        this.compras[index].costoTotal=0;
        compra.detalle.forEach((detalleCompra) => {
          this.compras[index].costoTotal += detalleCompra.cantidad * detalleCompra.producto.precioproducto;
        });
      });

      this.compras.sort((a, b) => {
        if (a.fechacompra < b.fechacompra) {
          return 1;
        }
        else if (a.fechacompra > b.fechacompra){
          return -1;
        }
        else{
          return 0;
        }
      });
      console.log(this.compras);
    });
  }

}
