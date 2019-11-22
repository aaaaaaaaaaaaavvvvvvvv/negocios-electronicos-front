import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { VariableGlobalServicio } from 'src/app/servicios/variableGlobal.service';
import { Usuario } from 'src/app/entidades/usuario.model';
import { UserLogeado } from 'src/app/entidades/userLogeado.model';
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

  loggedIn : string = '';
  constructor(variableGlobal: VariableGlobalServicio) { }
  usuario: UserLogeado = {
    codigousuario:0,
    nombreusuario:'',
    claveusuario: '',
    roles: []
  }

  ngOnInit() {
    this.loggedIn = this.variableGlobal.estaLogeado;
    $("#search_input_box").hide();
    $("#search").on("click", function () {
        $("#search_input_box").slideToggle();
        $("#search_input").focus();
    });
    $("#close_search").on("click", function () {
        $('#search_input_box').slideUp(500);
    });

  }

}
