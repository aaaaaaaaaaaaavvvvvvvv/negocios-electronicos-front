import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompraPojo } from '../entidades/compraPojo.model';
import { CabeceraCompra } from '../entidades/cabeceraCompra.model';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  apiURL = 'https://negelec-gutynatura.herokuapp.com';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  comprar(compraPojo: CompraPojo): Observable<Boolean> {
    return this.http.post<Boolean>(this.apiURL + '/carrito', compraPojo);
  }
  recuperarCompras (compraPojo: CompraPojo): Observable<CabeceraCompra[]>{  //Solo necesita codigoUsuario
    return this.http.post<CabeceraCompra[]>(this.apiURL+"/carrito/recupera",compraPojo,this.httpOptions)

  }
}
