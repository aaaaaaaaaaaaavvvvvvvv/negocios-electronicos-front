import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from '../entidades/producto.model';
import { Observable } from 'rxjs';
import { Usuario } from '../entidades/usuario.model';

@Injectable()
export class UsuariosServicios {

    apiURL = 'https://negelec-gutynatura.herokuapp.com';

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

    login(usuario: Usuario): Observable<Usuario[]>{
        return this.http.post<Usuario[]>(this.apiURL + '/email', usuario, this.requestOptions);
    }

}