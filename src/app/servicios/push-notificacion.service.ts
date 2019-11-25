import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { PushNotificacion } from '../entidades/pushNotificacion.model';
import { Observable } from 'rxjs';
import { pushResponse } from '../entidades/pushResponse.model';

@Injectable({
  providedIn: 'root'
})
export class PushNotificacionService {
  apiURL = 'https://negelec-gutynatura.herokuapp.com';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  constructor(private http:HttpClient) { }

  enviarNotificacion(pushNotificacion: PushNotificacion): Observable<pushResponse> {
    return this.http.post<pushResponse>(this.apiURL + '/push-notification', pushNotificacion);
  }
}
