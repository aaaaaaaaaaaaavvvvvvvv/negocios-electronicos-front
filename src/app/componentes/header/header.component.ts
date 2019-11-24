import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { VariableGlobalServicio } from 'src/app/servicios/variableGlobal.service';
import { Usuario } from 'src/app/entidades/usuario.model';
import { UserLogeado } from 'src/app/entidades/userLogeado.model';
import { CookieService } from 'ngx-cookie-service';
import { UsuariosServicios } from 'src/app/servicios/usuario.services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css',
    '../../../assets/karma/css/linearicons.css',
    '../../../assets/karma/css/owl.carousel.css',
    '../../../assets/karma/css/font-awesome.min.css',
    '../../../assets/karma/css/themify-icons.css',
    '../../../assets/karma/css/nice-select.css',
    '../../../assets/karma/css/nouislider.min.css',
    '../../../assets/karma/css/bootstrap.css',
    '../../../assets/karma/css/main.css']
})
export class HeaderComponent implements OnInit {

  loggedIn: string = '';
  constructor(private loginService: UsuariosServicios,
    public variableGlobal: VariableGlobalServicio,
    private cookieService: CookieService,
    private router: Router) { }
  usuario: UserLogeado = {
    codigousuario: 0,
    nombreusuario: '',
    claveusuario: ''
  }

  ngOnInit() {
    console.log(this.variableGlobal.usuarioGlobal);
    if (this.variableGlobal.usuarioGlobal == undefined || this.variableGlobal.usuarioGlobal == null) {
      const usu = this.cookieService.get('usu');
      const pass = this.cookieService.get('pass');
      if (usu != '' && pass != '') {
        let usuario: Usuario = {
          usuario: usu,
          clave: pass
        };
        this.loginService.login(usuario).subscribe((userLogeado) => {
          this.usuario.nombreusuario = userLogeado.nombreusuario;
          this.variableGlobal.usuarioGlobal = userLogeado;
          this.variableGlobal.estaLogeado = 'S';
          this.loggedIn = 'S';
        });
      }
    }
    console.log(this.variableGlobal.estaLogeado);
    $("#search_input_box").hide();
    $("#search").on("click", function () {
      $("#search_input_box").slideToggle();
      $("#search_input").focus();
    });
    $("#close_search").on("click", function () {
      $('#search_input_box').slideUp(500);
    });

  }
  cerrarSesion() {
    this.cookieService.delete('usu');
    this.cookieService.delete('pass');
    this.variableGlobal.estaLogeado = 'N';
    this.loggedIn = 'N';
    this.variableGlobal.usuarioGlobal = undefined;
    this.router.navigate(['/']);
  }

}
