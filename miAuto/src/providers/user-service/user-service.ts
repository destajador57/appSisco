import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserServiceProvider {

  constructor(public http: HttpClient) {
    
  }

  //
  Loguea(user,psw){
	return this.http.get('http://192.168.20.9:4800/Logea?user='+user+'&password='+psw);
  }
  //
  Registra(user,psw,vin,placas){
	return this.http.get('http://192.168.20.9:4800/Registra?user='+user+'&password='+psw+'&vin='+vin+'&placas='+placas);
  }
  //
  GetUnidades(idUser){
	return this.http.get('http://192.168.20.9:4800/GetUnidades?idUser='+idUser);
  }
  //
  GetTalleres(idUnidad,lat,lng){
	return this.http.get('http://192.168.20.9:4800/GetTalleres?idUnidad='+idUnidad+'&lat='+lat+'&lng='+lng);
  }
  //
  GetOrdXUni(idUnidad){
	return this.http.get('http://192.168.20.9:4800/GetOrdXUni?idUnidad='+idUnidad);
  }
  //
  GetDocsXUni(idUnidad){
	return this.http.get('http://192.168.20.9:4800/GetDocsXUni?idUnidad='+idUnidad);
  }
  
  ServicioNuevaCita(idUnidad,idContratoOperacion,idUsuario,Taller,servicio,fechaCita){
	return this.http.get('http://192.168.20.9:4800/ServicioNuevaCita?idUnidad=' + idUnidad + 
							'&idContratoOperacion=' + idContratoOperacion +
							'&idUsuario=' + idUsuario +
							'&Taller=' + Taller +
							'&servicio=' + servicio +
							'&fechaCita=' + fechaCita 
						);
  }
  
}
