import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VentasComponent } from './componentes/ventas/ventas.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ProductosServicios } from './servicios/productos.service';
import { HttpClientModule } from '@angular/common/http';
import { CarritocompraComponent } from './componentes/carritocompra/carritocompra.component';
import { VariableGlobalServicio } from './servicios/variableGlobal.service';
import { LoginComponent } from './componentes/login/login.component';
import { UsuariosServicios } from './servicios/usuario.services';
import { FlashMessagesModule } from 'angular2-flash-messages';


@NgModule({
  declarations: [
    AppComponent,
    VentasComponent,
    HeaderComponent,
    FooterComponent,
    CarritocompraComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    FormsModule
  ],
  providers: [
    ProductosServicios,
    VariableGlobalServicio,
    UsuariosServicios
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
