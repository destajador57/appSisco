import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { NavController, NavParams } from 'ionic-angular';
import { OptionPage } from '../option/option';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  elementoSeleccionado: any;
  unidades: Array<{nombre: string, descripcion: string, revision: number}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber:CallNumber) {

    this.elementoSeleccionado = navParams.get('unidad');

    this.unidades = [];
    this.unidades.push({nombre:'Chevrolet AVEO 2017',descripcion:'Este automovil esta casi nuevo',revision:1});
  }

  public showOptions(unidad){
    console.log(unidad);
    this.navCtrl.push(OptionPage, {unidad: unidad});
  };

  public llamarCallCenter(){
    this.callNumber.callNumber('5575839991', true)
    .then(()=> console.log('Esta llamando a call center'))
    .catch(()=> console.log('fallo la llamada'));
  };
}
