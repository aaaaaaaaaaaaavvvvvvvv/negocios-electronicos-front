import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario.model';
import { UsuariosServicios } from 'src/app/servicios/usuario.services';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { VariableGlobalServicio } from 'src/app/servicios/variableGlobal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
    this.loginService.login(this.usuario).subscribe(
      usuario => {
        if (usuario == null || usuario == undefined) {
          this.variableGlobal.usuarioGlobal = null;
          this.variableGlobal.estaLogeado = 'S';
        } else {
          this.variableGlobal.usuarioGlobal = usuario[0];
          this.variableGlobal.estaLogeado = 'N';
        }
      }
    );

  }

}
