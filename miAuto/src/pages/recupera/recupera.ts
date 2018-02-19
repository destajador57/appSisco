import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-recupera',
  templateUrl: 'recupera.html',
})
export class RecuperaPage {

  loading: Loading;
  usuario = {email: '', password: '',vin:'',placas:''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, 
    private alertCtrl: AlertController, public userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperaPage');
  }

  public recupera(){

  this.mostrarCarga();
	
	this.userService.RecuperaPsw(this.usuario.email ,this.usuario.placas)
    .subscribe(
        (data) => { // Success
          if(data){
              if (data.status =='no'){
                this.mostrarError(data.msg);
              }else{
                  let alert = this.alertCtrl.create({
                    title: 'OK',
                    subTitle: data.msg,
                    buttons: ['OK']
                  });
                  alert.present();
                  this.navCtrl.setRoot(LoginPage);
              }
          }
        },
        (error) =>{
          this.mostrarError("No es posible registrarse por el momento.");
        }
      );

    this.loading.dismiss();
  }

  mostrarCarga(){
    this.loading = this.loadingCtrl.create({
      content: 'Se han enviado los datos al correo registrado....',
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

  salir(){
    this.navCtrl.setRoot(LoginPage);
  };


}
