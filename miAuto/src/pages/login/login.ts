import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { RegistroPage } from '../registro/registro';
import { CambioContrasenaPage } from '../cambio-contrasena/cambio-contrasena';
import { RecuperaPage } from '../recupera/recupera'

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
    this.navCtrl.setRoot(RecuperaPage);
  }
  
  public login(){
    this.mostrarCarga();
	
	this.userService.Loguea(this.usuario.email,this.usuario.password)
    .subscribe(
    (data:any) => { // Success
      if(data){
        console.log(data);
        if(data.idUsuario != null && data.idUsuario !='' && data.idUsuario != '0'){
          this.navCtrl.setRoot(HomePage,{ cita: 
            { idUsuario: data.idUsuario, 
              idContratoOperacion: data.idContratoOperacion,
              mensajes: data.mensajes
            }});
        }else{
          this.mostrarError('No se pudo obtener el usuario');
        }
      }
		},
		(error) =>{
			this.mostrarError("El usuario o contraseña es incorrecto o no se encuentra registrado el usuario.");
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

  public registrarse(){
    this.navCtrl.setRoot(RegistroPage);
    }
  public cambioContrasena(){
      this.navCtrl.setRoot(CambioContrasenaPage);
      }
}
