import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { NavController, NavParams } from 'ionic-angular';
import { OptionPage } from '../option/option';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { LoginPage } from '../login/login';
import { CalificaPage } from '../califica/califica';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  cita: any;
  unidades: Array<{nombre: string, idUnidad:number}>;
  placas: any;
  vin: any;
  modelo: any;
  nombreMarca: any;
  idEstatus: number;
  idOrden: number;
  numeroOrden: string;
  fechaCita: any;
  telefonoSiniestro: any;
  
  constructor(public navCtrl: NavController, 
			  public navParams: NavParams, 
			  private callNumber:CallNumber,
			  public userService: UserServiceProvider) {
	this.unidades = [];
  this.cita = navParams.get('cita');
	this.userService.GetUnidades(this.cita.idUsuario)
    .subscribe(
    (data) => { // Success
      console.log(data);
			this.unidades.push({
        nombre: data[0].nombreSubMarca,
        idUnidad: data[0].idUnidad
			});
    
			this.placas= data[0].placas; 
			this.vin= data[0].vin;
			this.modelo= data[0].modelo;
      this.nombreMarca= data[0].nombreMarca;
      this.idEstatus = data[0].idEstatus;
      this.idOrden = data[0].idOrden;
      this.numeroOrden = data[0].numeroOrden;
      this.fechaCita = data[0].fechaCita;
      this.telefonoSiniestro = data[0].telefonoSiniestro;
		},
		(error) =>{
			console.error(error);
		}
	);
  }
 
  public showOptions(unidad){
    this.navCtrl.push(OptionPage, {cita: {
      idUsuario: this.cita.idUsuario,
      idContratoOperacion: this.cita.idContratoOperacion,
      idUnidad: this.unidades[0].idUnidad,
      idEstatus: this.idEstatus,

      telefonoSiniestro: this.telefonoSiniestro,
      nombre:this.unidades[0].nombre,
      modelo: this.modelo,
      nombreMarca: this.nombreMarca
    }});
  };

  calificar(){
    this.navCtrl.push(CalificaPage, {cita:{ idOrden: this.idOrden, idUsuario: this.cita.idUsuario , idContratoOperacion: this.cita.idContratoOperacion}});
  }

  public llamarCallCenter(){
    this.callNumber.callNumber('5575839991', true)
    .then(()=> console.log('Esta llamando a call center'))
    .catch(()=> console.log('fallo la llamada'));
  };

  salir(){
    this.navCtrl.setRoot(LoginPage);
  };
}
