import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VentasComponent } from './componentes/ventas/ventas.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ProductosServicios } from './servicios/productos.service';
import { HttpClientModule } from '@angular/common/http';
import { CarritocompraComponent } from './componentes/carritocompra/carritocompra.component';
import { VariableGlobalServicio } from './servicios/variableGlobal.service';

@NgModule({
  declarations: [
    AppComponent,
    VentasComponent,
    HeaderComponent,
    FooterComponent,
    CarritocompraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ProductosServicios,
    VariableGlobalServicio
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
