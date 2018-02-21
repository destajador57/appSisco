import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { OptionPage } from '../option/option';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { LoginPage } from '../login/login';
import { CalificaPage } from '../califica/califica';
import { LocalNotifications } from '@ionic-native/local-notifications';

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
  nombreSubMarca: string;
  
  constructor(public navCtrl: NavController, 
			  public navParams: NavParams, 
			  private callNumber:CallNumber,
        public userService: UserServiceProvider,
        private localNotifications: LocalNotifications,
        public plt: Platform) {

	this.unidades = [];
  this.cita = navParams.get('cita');
	this.userService.GetUnidades(this.cita.idUsuario)
    .subscribe(
    (data:any) => { // Success
      console.log(data);
			this.unidades.push({
        nombre: data.unidades[0].nombreSubMarca,
        idUnidad: data.unidades[0].idUnidad
			});
    
			this.placas= data.unidades[0].placas; 
			this.vin= data.unidades[0].vin;
			this.modelo= data.unidades[0].modelo;
      this.nombreMarca= data.unidades[0].nombreMarca;
      this.idEstatus = data.unidades[0].idEstatus;
      this.idOrden = data.unidades[0].idOrden;
      this.numeroOrden = data.unidades[0].numeroOrden;
      this.fechaCita = data.unidades[0].fechaCita;
      this.telefonoSiniestro = data.unidades[0].telefonoSiniestro;
      this.nombreSubMarca = data.unidades[0].nombreSubMarca;
      this.notificar(data.mensajes);
		},
		(error) =>{
			console.error(error);
		}
	);
  }

  private notificar(mensajes: Array<any>):void {

    let notificaciones = [];

    mensajes.forEach((mensaje,idx) => {
      notificaciones.push({
        id: idx,
        title: mensaje.titulo,
        text: mensaje.mensaje,
        //at: new Date(new Date().getTime() + 3600),
        sound: this.plt.is('android') ? 'file://sound.mp3': 'file://beep.caf',
      })
    });

    this.localNotifications.schedule(notificaciones);
  }
 
  public showOptions(unidad){
    this.navCtrl.push(OptionPage, {cita: {
      idUsuario: this.cita.idUsuario,
      idContratoOperacion: this.cita.idContratoOperacion,
      idUnidad: this.unidades[0].idUnidad,
      idEstatus: this.idEstatus,
      vin: this.vin,

      telefonoSiniestro: this.telefonoSiniestro,
      nombre:this.unidades[0].nombre,
      modelo: this.modelo,
      nombreMarca: this.nombreMarca,
      nombreSubMarca: this.nombreSubMarca
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
