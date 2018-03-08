import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DhlServiceService {

  urlService: string;
  constructor(private http: HttpClient) {
   // this.urlService = 'http://192.168.0.167:4850/';
  this.urlService = 'http://189.204.141.193:4850/';
  }

  login(user) {
    console.log(user);
    console.log('invoca el login');
    const url = this.urlService + 'LogInWeb?Usuario=' + user.usuario + '&Password=' + user.contrasena ;
    console.log(url);
    return this.http.get(url);
  }

  GetUnidades() {
    const url = this.urlService + 'Get_All';
    console.log(url);
    return this.http.get(url);
  }

  GetComentariosByUnidad(idUnidad) {
    const url = this.urlService + 'BuscaComen?idUnidad=' + idUnidad;
    console.log(url);
    return this.http.get(url);
  }


  InsertComentario(idUnidad, comentario, UsuarioID) {
    const url = this.urlService + 'BuscaComen?idUnidad=' + idUnidad;
    return this.http.get(url);
  }

GetCotizacionByUnidad(idUnidad) {
    const url = this.urlService + 'BuscarCoti?idUnidad=' + idUnidad;
    console.log(url);
    return this.http.get(url);
  }


  InsertCotizacion(idUnidad, partida,cantidad,precio, UsuarioID) {
    const url = this.urlService + 'InsertCoti?idUnidad=' + idUnidad +'&Partida=' + partida +'&Precio=' + precio +'&Cantidad=' + cantidad +'&UsuarioId=' + UsuarioID ;
    console.log(url);
    return this.http.get(url);
  }

  GetEvidenciasByUnidad(idUnidad) {
    const url = this.urlService + 'Get_Evidencia?idUnidad=' + idUnidad;

    console.log(url);
    return this.http.get(url);
  }
}
