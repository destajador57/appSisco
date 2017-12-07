import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,private datePicker: DatePicker, public userService: UserServiceProvider, private alertCtrl: AlertController) {
    this.cita = navParams.get('cita');
    console.log(this.cita);
    // this.fecha = new Date();

    // this.datePicker.show({
    //   date: new Date(),
    //   mode: 'date',
    //   androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    // }).then(
    //   date => {
    //     this.fecha = date;
    //   },
    //   err => console.log('Error occurred while getting date: ', err)
    // );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmacionPage');

  }

  confirmarServicio(){
    console.log(this.cita);
    this.fecha = new Date();
    this.fecha.toString('yyyyMMdd');
    var nuevaFecha = this.fecha.getFullYear() + (this.fecha.getMonth()+1).toString() + this.fecha.getDate().toString();
    console.log(nuevaFecha);

    this.userService.ServicioNuevaCita(
      this.cita.idUnidad, 
      this.cita.idContratoOperacion ,
      this.cita.idUsuario,
    this.cita.idTaller,
  this.cita.idServicio,
  //this.fecha.getFullYear() + (this.fecha.getMonth()+1).toString() + (this.fecha.getDate().toString().length > 1 ? this.fecha.getDate().toString() : '0' + this.fecha.getDate().toString()))
  this.cita.fecha)
    .subscribe(
    (data) => { // Success
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
    //this.rootPage = LoginPage;
    this.navCtrl.setRoot(LoginPage);
    console.log('deberia funcioan');
  };
}
