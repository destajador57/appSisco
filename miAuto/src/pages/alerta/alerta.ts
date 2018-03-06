import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-alerta',
  templateUrl: 'alerta.html',
})
export class AlertaPage {

  mensajes: Array<any>;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.mensajes = navParams.get('mensajes');
    console.log(this.mensajes);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlertaPage');
  }

  salir() {
    this.viewCtrl.dismiss();
  }
}
