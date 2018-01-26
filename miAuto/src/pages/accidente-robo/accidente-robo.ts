import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-accidente-robo',
  templateUrl: 'accidente-robo.html',
})
export class AccidenteRoboPage {

  cita: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber) {
    this.cita = navParams.get('cita');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccidenteRoboPage');
  }

  public llamarCallCenter(){
    console.log(this.cita.telefonoSiniestro);
    this.callNumber.callNumber(this.cita.telefonoSiniestro, true)
    .then(()=> console.log('Esta llamando a call center'))
    .catch(()=> console.log('fallo la llamada'));
  }

  salir(){
    this.navCtrl.setRoot(LoginPage);
  };
}
