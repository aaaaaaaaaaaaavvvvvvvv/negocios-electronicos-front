import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from '../entidades/producto.model';
import { Observable } from 'rxjs';
import { Usuario } from '../entidades/usuario.model';
import { UserLogeado } from '../entidades/userLogeado.model';

@Injectable()
export class UsuariosServicios {

    //apiURL = 'https://negelec-gutynatura.herokuapp.com';
    apiURL = 'http://localhost:8099'
    constructor(private http: HttpClient) { }

    requestOptions: Object = {
        /* other options here */
        responseType: 'application/json'
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    login(usuario: Usuario): Observable<UserLogeado>{
        return this.http.post<UserLogeado>(this.apiURL + '/login', usuario, this.requestOptions);
    }

}