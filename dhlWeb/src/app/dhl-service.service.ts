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

  GetUnidades()
  {
    // console.log(user);
    // console.log('invoca el login');
    // const url = this.urlService + 'LogInWeb?Usuario=' + user.usuario + '&Password=' + user.contrasena ;
    const url = ""
    console.log(url);
    return this.http.get(url);

  }
}
