import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentasComponent } from './componentes/ventas/ventas.component';
import { CarritocompraComponent } from './componentes/carritocompra/carritocompra.component';
import { LoginComponent } from './componentes/login/login.component';


const routes: Routes = [
  {path:'carritocompra', component: CarritocompraComponent},
  {path:'login', component: LoginComponent},
  {path:'', component: VentasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
