import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserServiceProvider {

  server : any;
  stringconn : any;
  constructor(public http: HttpClient) {

     this.server =  this.http.get('manifest.json').subscribe(
      (data:any) => { // Success
          this.server = data.server;
      },
      (error) =>{
      }
    );
  }

  //
  Loguea(user,psw){
    this.stringconn = this.server +'Logea?user='+user+'&password='+psw
    console.log(this.stringconn);
	  return this.http.get(this.stringconn);
  }
  //
  Registra(user,psw,vin,placas){
	return this.http.get(this.server +'Registra?user='+user+'&password='+psw+'&vin='+vin+'&placas='+placas);
  }
  //
  GetUnidades(idUser){
    console.log(this.server +'GetUnidades?idUser='+idUser);
	return this.http.get(this.server +'GetUnidades?idUser='+idUser);
  }
  //
  GetTalleres(idUnidad,lat,lng){
	return this.http.get(this.server +'GetTalleres?idUnidad='+idUnidad+'&lat='+lat+'&lng='+lng);
  }
  //
  GetPromocion(marca, submarca){
    return this.http.get(this.server + 'GetPromocion?marca=' + marca + '&submarca=' + submarca);
    }
  //
  GetOrdXUni(idUnidad){
	return this.http.get(this.server +'GetOrdXUni?idUnidad='+idUnidad);
  }
  //
  GetDocsXUni(idUnidad){
	return this.http.get(this.server +'GetDocsXUni?idUnidad='+idUnidad);
  }
  
  ServicioNuevaCita(idUnidad,idContratoOperacion,idUsuario,Taller,servicio,fechaCita){
	return this.http.get(this.server +'ServicioNuevaCita?idUnidad=' + idUnidad + 
							'&idContratoOperacion=' + idContratoOperacion +
							'&idUsuario=' + idUsuario +
							'&idTaller=' + Taller +
							'&idServicio=' + servicio +
							'&fechaCita=' + fechaCita 
						);
  }

  CitaServicios(){
    return this.http.get(this.server +'CitaServicios');
  }
  
  CalificaTaller(idOrden,calificacion){
    return this.http.get(this.server +'CalificaTaller?idOrden=' + idOrden + 
                  '&calificacion1=' + calificacion.primera +
                  '&calificacion2=' + calificacion.segunda +
                  '&calificacion3=' + calificacion.tercera +
                  '&calificacion4=' + calificacion.cuarta +
                  '&calificacion5=' + calificacion.quinta 
                );
  }

  GetKilometros(vin){
        return this.http.get(this.server +'GetKilometros?vin='+vin);
  }

  RecuperaPsw(idUsuario, placas){
    return this.http.get(this.server + 'RecuperaPsw?idUsuario=' + idUsuario + '&placas=' + placas);
  } 
  
}
