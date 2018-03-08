import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';

import { IAutoTb } from "./AutoTb"; //Importamos la intefaz para cachar los datos
import { IServerResponse } from "./ServerResponse";
// import { IEmpresas } from "./empresas";
// import { ITipoPromocion } from "./tipo-promocion";
// import { IMarca } from "./marca";
// import { ISucursal } from "./sucursal";
 import { IComentarioById } from "./comentarioByid";
 import { ICotizacionById } from "./cotizacionById";
// import { Iimage } from "./Img";


@Injectable()
export class DashService {

  //Rutas para las peticiones a la api
  private _urlPromociones         = "api/dash/autoAll";
  //  private _urlDeletePromo     = "api/promociones/deletepromociones";
  //  private _urlEmpresas        = "api/promociones/empresas";
  //  private _urlTipoPromo       = "api/promociones/tipopromocion";
  //  private _urlMarca           = "api/promociones/marca";
  //  private _urlSucursal        = "api/promociones/sucursal";
  private _urlInsertComent        = "api/dash/insertComentario";
  private _urlGetComentarioById   = "api/dash/getcomentariobyid";

  private _urlInsertCoti       = "api/dash/insertCotizacion";
  private _urlGetCotizacionById   = "api/dash/getcotizacionbyid";

  //  private _urlUpdatePromo     = "api/promociones/updatepromocion";
  //  private _urlUpdateImage     = "api/promociones/updateimage";

  constructor(private _http: HttpClient) { }

  getDashColumn(): Observable<IAutoTb[]> {

    //Inicializamos un nuevo onjeto de tipo HttpParams
    let Params = new HttpParams();

    return this._http.get<IAutoTb[]>(this._urlPromociones, { params: Params })
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.error(err.message);
    return Observable.throw(err.message);
  }

  saveComentarios(cuerpo): Observable<IServerResponse[]> {
    console.log('cuerpo', cuerpo);
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/form-data');
    return this._http.post<IServerResponse[]>(this._urlInsertComent, cuerpo.value, { headers: headers });
  }

  saveCotizaciones(cuerpo): Observable<IServerResponse[]> {
    console.log('cuerpo', cuerpo);
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/form-data');
    return this._http.post<IServerResponse[]>(this._urlInsertCoti, cuerpo.value, { headers: headers });
  }

  GetPromocion_ById(parameters): Observable<IComentarioById[]>{
        
    let Params = new HttpParams();
    Params = Params.append("idUnidad", parameters.idUnidad);

    return this._http.get<IComentarioById[]>(this._urlGetComentarioById, {params: Params})
    .catch( this.handleError );
}
}
