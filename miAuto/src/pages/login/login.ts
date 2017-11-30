import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: Loading;
  usuario = {email: '', password: ''};

  constructor(public navCtrl: NavController, private callNumber: CallNumber, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  public recuperarContrasena(){
    this.mostrarError("Aun no funciona.");
  }

  public login(){
    this.mostrarCarga();
    if(this.usuario.email == 'usuario'){
      this.navCtrl.setRoot(HomePage);
    } else {
      this.mostrarError("El usuario o contraseña es incorrecto.");
    }
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
