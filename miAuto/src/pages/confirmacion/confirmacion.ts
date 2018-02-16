import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-confirmacion',
  templateUrl: 'confirmacion.html',
})
export class ConfirmacionPage {
  
  cita:any;
  fecha:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserServiceProvider, 
    private alertCtrl: AlertController) {

    this.cita = navParams.get('cita');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmacionPage');
  }

  confirmarServicio(){

    const fecha = this.cita.fecha.substring(0, 4) +
      this.cita.fecha.substring(5, 7) +
      this.cita.fecha.substring(8, 10) + ' ' +
      this.cita.fecha.substring(11, 19);

    // this.fecha = new Date();
    // this.fecha.toString('yyyyMMdd');
    // var nuevaFecha = this.fecha.getFullYear() + (this.fecha.getMonth()+1).toString() + this.fecha.getDate().toString();
    this.userService.ServicioNuevaCita(
      this.cita.idUnidad, 
      this.cita.idContratoOperacion ,
      this.cita.idUsuario,
    this.cita.idTaller,
  this.cita.idServicio,
  fecha)
    .subscribe(
    (data:any) => { // Success
        console.log(data);
        if(data && data != null && data.length > 0 && data[0].numeroOrden != null){
          this.navCtrl.setRoot(HomePage,{ cita: { idUsuario: this.cita.idUsuario, idContratoOperacion: this.cita.idContratoOperacion}});
        }
		},
		(error) =>{
      console.log(error);
			this.mostrarError("Ocurrio un error al generar la cita, intentalo mas tarde.");
		}
	);
  }

  mostrarError(mensaje){
    
       let alert = this.alertCtrl.create({
         title: 'Error',
         subTitle: mensaje,
         buttons: ['OK']
       });
       alert.present();
  }

  salir(){
    this.navCtrl.setRoot(LoginPage);
  };
}
