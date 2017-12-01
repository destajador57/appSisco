import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-registra',
  templateUrl: 'registra.html',
})
export class RegistraPage {

  constructor(public navCtrl: NavController, 
		public navParams: NavParams, 
		private callNumber: CallNumber) {
  }

  public llamarCallCenter(){
    this.callNumber.callNumber('5575839991', true)
    .then(()=> console.log('Esta llamando a call center'))
    .catch(()=> console.log('fallo la llamada'));
  }
}
