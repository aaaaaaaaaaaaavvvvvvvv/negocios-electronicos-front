import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario.model';
import { UsuariosServicios } from 'src/app/servicios/usuario.services';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { VariableGlobalServicio } from 'src/app/servicios/variableGlobal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : string = '';
  pass : string = '';
  mensajeerror: String = '';
  usuario: Usuario = {
    usuario: '',
    clave: ''
  }

  constructor(private loginService: UsuariosServicios,
    private router: Router,
    private flashMessages: FlashMessagesService,
    private variableGlobal: VariableGlobalServicio) { }

  ngOnInit() {
  }

  login() {
    this.usuario.clave = this.pass;
    this.usuario.usuario = this.user;
    this.loginService.login(this.usuario).subscribe(
      usuario => {
        console.log('Usuario que regresa del servicio');
        console.log(usuario);
        if (usuario == null || usuario == undefined ) {
          this.mensajeerror='Las credenciales son incorrectas.';
          this.flashMessages.show('Error de autenticacion', {
            cssClass: 'alert-danger', timeout: 4000
          });
          this.variableGlobal.usuarioGlobal = null;
          this.variableGlobal.estaLogeado = 'N';
          this.router.navigate(['/login']);
        } else {
          
          this.variableGlobal.usuarioGlobal = usuario;
          console.log('Usuario global');
          console.log(this.variableGlobal.usuarioGlobal.codigousuario);
          this.variableGlobal.estaLogeado = 'S';
          this.router.navigate(['/']);
        }
      }
    );

  }

}
