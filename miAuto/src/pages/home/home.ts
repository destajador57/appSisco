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
  unidades: Array<{nombre: string}>;
  placas: any;
  vin: any;
  modelo: any;
  nombreMarca: any;
  //unidades: Array<{nombre: string, descripcion: string, revision: number}>;

  constructor(public navCtrl: NavController, 
			  public navParams: NavParams, 
			  private callNumber:CallNumber,
			  public userService: UserServiceProvider) {
	this.unidades = [];
    this.elementoSeleccionado = navParams.get('unidad');
	this.users = navParams.get('idUsuario');
    
	
	this.userService.GetUnidades(this.users)
    .subscribe(
		(data) => { // Success
		
			this.unidades.push({
				nombre: data[0].nombreSubMarca
			});
			
			this.placas= data[0].placas; 
			this.vin= data[0].vin;
			this.modelo= data[0].modelo;
			this.nombreMarca= data[0].nombreMarca;
			
		},
		(error) =>{
			console.error(error);
		}
	);
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
