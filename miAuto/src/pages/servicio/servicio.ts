import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-servicio',
  templateUrl: 'servicio.html',
})
export class ServicioPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber) {
  }

  public llamarCallCenter(){
    this.callNumber.callNumber('5575839991', true)
    .then(()=> console.log('Esta llamando a call center'))
    .catch(()=> console.log('fallo la llamada'));
  }

  salir(){
    this.navCtrl.setRoot(LoginPage);
  };
}
