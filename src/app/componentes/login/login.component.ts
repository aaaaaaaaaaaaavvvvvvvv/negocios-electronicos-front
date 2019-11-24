import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario.model';
import { UsuariosServicios } from 'src/app/servicios/usuario.services';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { VariableGlobalServicio } from 'src/app/servicios/variableGlobal.service';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { UserLogeado } from 'src/app/entidades/userLogeado.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: string = '';
  pass: string = '';
  mensajeerror: String = '';
  usuario: Usuario = {
    usuario: '',
    clave: ''
  }

  constructor(private loginService: UsuariosServicios,
    private router: Router,
    private variableGlobal: VariableGlobalServicio,
    private cookieService: CookieService) { }

  ngOnInit() {
  }

  login() {
    this.usuario.clave = this.pass;
    this.usuario.usuario = this.user;
    this.loginService.login(this.usuario).subscribe(
      (usuario: UserLogeado) => {
        console.log('Usuario que regresa del servicio');
        console.log(usuario);
        if (usuario == null || usuario == undefined) {
          this.mensajeerror = 'Las credenciales son incorrectas.';
          Swal.fire(
            'Usuario o contraseña inválido',
            '',
            'error'
          );
          this.variableGlobal.usuarioGlobal = null;
          this.variableGlobal.estaLogeado = 'N';
          this.router.navigate(['/login']);
        } else {
          this.cookieService.set('usu',this.user);
          this.cookieService.set('pass',this.pass)
          this.variableGlobal.usuarioGlobal = usuario;
          this.variableGlobal.estaLogeado = 'S';
          console.log('Usuario global');
          this.router.navigate(['/']);
        }
      }
    );

  }

}
