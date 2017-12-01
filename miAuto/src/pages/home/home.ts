import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { NavController, NavParams } from 'ionic-angular';
import { OptionPage } from '../option/option';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: any; //
  
  elementoSeleccionado: any;
  unidades: Array<{nombre: string, descripcion: string, revision: number}>;

  constructor(public navCtrl: NavController, 
			  public navParams: NavParams, 
			  private callNumber:CallNumber,
			  public userService: UserServiceProvider) {

    this.elementoSeleccionado = navParams.get('unidad');

    this.unidades = [];
    this.unidades.push({nombre:'Chevrolet AVEO 2017',descripcion:'Este automovil esta casi nuevo',revision:1});
	
	this.userService.Loguea('super.cadereyta','PW1ZngDb')
    .subscribe(
      (data) => { // Success
        //this.users = data.idUsuario;
		console.log( this.users);
      },
      (error) =>{
        console.error(error);
      }
    )
	
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
