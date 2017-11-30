import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { NavController, NavParams } from 'ionic-angular';
import { MantenimientoPage } from '../mantenimiento/mantenimiento';
import { AccidenteRoboPage } from '../accidente-robo/accidente-robo';
import { ControlDocumentalPage } from '../control-documental/control-documental';

@Component({
  selector: 'page-option',
  templateUrl: 'option.html',
})
export class OptionPage {
  unidadSeleccionada: {nombre: string, descripcion: string, revision: number};

  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber) {
    this.unidadSeleccionada = navParams.get('unidad');
  }

  showAccidenteRobo(){
    this.navCtrl.push(AccidenteRoboPage,{unidadSeleccionada: this.unidadSeleccionada});
  }

  showControlDocumental(){
    this.navCtrl.push(ControlDocumentalPage,{unidadSeleccionada: this.unidadSeleccionada});
  }

  showMantenimiento(){
    console.log(this.unidadSeleccionada);
    this.navCtrl.push(MantenimientoPage,{unidadSeleccionada: this.unidadSeleccionada});
  }

  public llamarCallCenter(){
    this.callNumber.callNumber('5575839991', true)
    .then(()=> console.log('Esta llamando a call center'))
    .catch(()=> console.log('fallo la llamada'));
  }
}
