import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from '../entidades/producto.model';
import { Observable } from 'rxjs';

@Injectable()
export class ProductosServicios {

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

    getProductos(): Observable<Producto[]>{
        return this.http.get<Producto[]>(this.apiURL + '/productos');
    }

}