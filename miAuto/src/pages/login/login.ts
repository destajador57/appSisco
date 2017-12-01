import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: Loading;
  usuario = {email: '', password: ''};

  constructor(public navCtrl: NavController, private callNumber: CallNumber, private alertCtrl: AlertController, private loadingCtrl: LoadingController,public userService: UserServiceProvider) {
  }

  public recuperarContrasena(){
    this.mostrarError("Aun no funciona.");
  }

  public registrarse(){
	
  }
  
  public login(){
    this.mostrarCarga();
	
	this.userService.Loguea(this.usuario.email,this.usuario.password)
    .subscribe(
		(data) => { // Success
			if(data.idUsuario !='' && data.idUsuario != '0'){
				this.navCtrl.setRoot(HomePage,{ idUsuario: data.idUsuario});
			}else{
				this.mostrarError(data.Msj);
			}
		},
		(error) =>{
			this.mostrarError("El usuario o contraseña es incorrecto.");
		}
	);
    
    this.loading.dismiss();
  }

  mostrarCarga(){
    this.loading = this.loadingCtrl.create({
      content: 'Espera un momento...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  mostrarError(mensaje){
    
       let alert = this.alertCtrl.create({
         title: 'Error',
         subTitle: mensaje,
         buttons: ['OK']
       });
       alert.present();
  }

  public llamarCallCenter(){
    this.callNumber.callNumber('5575839991', true)
    .then(()=> console.log('Esta llamando a call center'))
    .catch(()=> console.log('fallo la llamada'));
  }
}
