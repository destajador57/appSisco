import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { NavController, NavParams } from 'ionic-angular';
import { MantenimientoPage } from '../mantenimiento/mantenimiento';
import { AccidenteRoboPage } from '../accidente-robo/accidente-robo';
import { ControlDocumentalPage } from '../control-documental/control-documental';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-option',
  templateUrl: 'option.html',
})
export class OptionPage {

  cita: any;

  constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		private callNumber: CallNumber) {

    this.cita = navParams.get('cita');
    
    this.cita.idUnidad
    
  }

  showAccidenteRobo(){
    this.navCtrl.push(AccidenteRoboPage);
  }

  showControlDocumental(){
    this.navCtrl.push(ControlDocumentalPage,{cita: this.cita});
  }

  showMantenimiento(){
    console.log(this.cita);
    this.navCtrl.push(MantenimientoPage,{cita: this.cita});
  }

  public llamarCallCenter(){
    this.callNumber.callNumber('5575839991', true)
    .then(()=> console.log('Esta llamando a call center'))
    .catch(()=> console.log('fallo la llamada'));
  }

  salir(){
    //this.rootPage = LoginPage;
    this.navCtrl.setRoot(LoginPage);
    console.log('deberia funcioan');
  }
}
