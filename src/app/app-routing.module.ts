import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentasComponent } from './componentes/ventas/ventas.component';
import { CarritocompraComponent } from './componentes/carritocompra/carritocompra.component';


const routes: Routes = [
  {path:'carritocompra', component: CarritocompraComponent},
  {path:'', component: VentasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
