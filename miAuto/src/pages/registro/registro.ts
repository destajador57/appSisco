import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  usuario = {email: '', password: '',vin:'',placas:''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  public registrar(){
console.log(this.usuario);
	this.userService.Registra(this.usuario.email,this.usuario.password, this.usuario.vin, this.usuario.placas)
    .subscribe(
    (data) => { // Success
      if(data){
        if(data.idUsuario != null && data.idUsuario !='' && data.idUsuario != '0'){
          console.log(data.idUsuario);
          this.navCtrl.setRoot(HomePage,{ idUsuario: data.idUsuario});
        }else{
          this.mostrarError(data.Msj);
        }
      }
		},
		(error) =>{
			this.mostrarError("No es posible registrarse por el momento.");
		}
	);
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
    //this.rootPage = LoginPage;
    this.navCtrl.setRoot(LoginPage);
    console.log('deberia funcioan');
  };
}
