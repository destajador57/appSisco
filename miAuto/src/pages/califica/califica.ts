import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { CallNumber } from '@ionic-native/call-number';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { HomePage } from '../home/home';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-califica',
  templateUrl: 'califica.html',
})
export class CalificaPage {

  cita: any;

  calificacion: {
    primera: number,
    segunda: number,
    tercera: number,
    cuarta: number,
    quinta: number
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber, public userService: UserServiceProvider, private alertCtrl: AlertController, private camera: Camera) {
    this.cita = navParams.get('cita');

    this.calificacion = {
      primera: 1,
      segunda: 1,
      tercera: 1,
      cuarta: 1,
      quinta: 1
    };
    console.log(this.cita);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalificaPage');
  }

  calificarPrimera(calificacion) {
    this.calificacion.primera = calificacion;
  }
  calificarSegunda(calificacion) {
    this.calificacion.segunda = calificacion;
  }
  calificarTercera(calificacion) {
    this.calificacion.tercera = calificacion;
  }
  calificarCuarta(calificacion) {
    this.calificacion.cuarta = calificacion;
  }
  calificarQuinta(calificacion) {
    this.calificacion.quinta = calificacion;
  }

  calificar() {
    this.userService.CalificaTaller(this.cita.idOrden, this.calificacion)
      .subscribe(
      (data) => { // Success
        this.navCtrl.setRoot(HomePage, { cita: this.cita });
      },
      (error) => {
        this.mostrarError('Por el momento no es posible calificar');
      }
      );
  }

  agregarEvidencia() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      //let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  mostrarError(mensaje) {

    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: mensaje,
      buttons: ['OK']
    });
    alert.present();
  }

  public llamarCallCenter() {
    this.callNumber.callNumber('5575839991', true)
      .then(() => console.log('Esta llamando a call center'))
      .catch(() => console.log('fallo la llamada'));
  };

  salir() {
    this.navCtrl.setRoot(LoginPage);
  };
}
