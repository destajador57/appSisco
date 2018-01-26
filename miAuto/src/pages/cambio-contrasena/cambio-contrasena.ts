import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cambio-contrasena',
  templateUrl: 'cambio-contrasena.html',
})
export class CambioContrasenaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CambioContrasenaPage');
  }

}
