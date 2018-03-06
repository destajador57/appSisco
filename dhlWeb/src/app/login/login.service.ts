import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { IAuth } from './auth';

@Injectable()
export class LoginService {
  public _urlLogin = 'http://localhost:4850/LogInWeb?Usuario=userweb&Password=123';
  constructor(public _http: HttpClient) {

    
   }

  private handleError(err: HttpErrorResponse) {
    console.error(err.message);
    return Observable.throw(err.message);
  }

  getAuth(parameters){
  
    // Initialize Params Object
    let Params = new HttpParams();
    let Headers = new HttpHeaders();
    
    Headers = Headers.append("Access-Control-Allow-Origin","*");
    Headers = Headers.append("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    Headers = Headers.append("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    
    console.log(Headers);
    // Begin assigning parameters
    Params = Params.append('Usuario', parameters.usuario);
    Params = Params.append('Password', parameters.password)
    //Params = Params.append('mensajeUsuario', parameters.mensajeUsuario);
  
    return this._http.get(this._urlLogin)
      // .do(data => console.log('All:' + JSON.stringify(data)))
      .catch(this.handleError);
  }
}
