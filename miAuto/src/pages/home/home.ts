import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { OptionPage } from '../option/option';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { LoginPage } from '../login/login';
import { CalificaPage } from '../califica/califica';
import { AlertaPage } from '../alerta/alerta';
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
        public modalCtrl: ModalController,
        private localNotifications: LocalNotifications,
        public plt: Platform) {

	this.unidades = [];
  this.cita = navParams.get('cita');
  console.log('invoca el getunidades');
	this.userService.GetUnidades(this.cita.idUsuario)
    .subscribe(
    (data:any) => { // Success
      console.log('getunidades');
      console.log(data);
      console.log('cambio');
      console.log(data[0]);
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
      this.nombreSubMarca = data[0].nombreSubMarca;
      console.log(this.cita);
      console.log(this.cita.mensajes);
      this.notificar(this.cita.mensajes);
		},
		(error) =>{
			console.error(error);
		}
	);
  }

  private notificar(mensajes: Array<any>):void {

    let notificaciones = [];
    console.log('estos son los nuevos mensajes');
    console.log(mensajes);
    if(mensajes && mensajes.length > 0){

      mensajes.forEach((mensaje,idx) => {
        notificaciones.push({
          id: idx,
          title: mensaje.titulo,
          text: mensaje.mensaje,
          sound: this.plt.is('android') ? 'file://sound.mp3': 'file://beep.caf',
        })
      });

      this.localNotifications.schedule(notificaciones);

      let modal = this.modalCtrl.create(AlertaPage,{mensajes:mensajes});
      modal.onDidDismiss(data=>{
        console.log(data);
      });
  
      modal.present();
    }
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
