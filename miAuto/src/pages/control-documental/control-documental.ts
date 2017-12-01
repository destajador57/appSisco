import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, AlertController } from 'ionic-angular';
import { DocumentoPage } from '../documento/documento';
import { LoginPage } from '../login/login';
import { UserServiceProvider } from '../../providers/user-service/user-service';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-control-documental',
  templateUrl: 'control-documental.html',
})
export class ControlDocumentalPage {

  unidadSeleccionada: {nombre: string, idUnidad: number};

  documento: {
    placas: string, 
    Tenencia: string, 
    Verificacion: string, 
    PolizaDeSeguros: string, 
    tarjetaDeCirculacion: string,
    fechaVigenciaPolizaSeguro: string,
    fechaVerificacion: string
  };

  constructor(public navCtrl: NavController, public platform: Platform, public navParams: NavParams, private alertCtrl: AlertController, public userService: UserServiceProvider) {

    this.unidadSeleccionada = navParams.get('unidadSeleccionada');

    this.documento = {
      placas: '',
      Tenencia:'',
      Verificacion:'',
      PolizaDeSeguros: '', 
      tarjetaDeCirculacion: '',
      fechaVigenciaPolizaSeguro: '',
      fechaVerificacion: ''
    };
  }

  descargar(url){
    console.log('lo que va a mandar');
    console.log(url);
    this.navCtrl.push(DocumentoPage, {url: url});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ControlDocumentalPage');

    this.userService.GetDocsXUni(this.unidadSeleccionada.idUnidad)
    .subscribe(
    (data) => { // Success
        console.log(data);
        if(data && data != null && data.length > 0){
          var doc = data[0];
          this.documento ={
            placas: doc.placas ? doc.placas : '', 
            Tenencia: doc.Tenencia ? doc.Tenencia : '', 
            Verificacion: doc.Verificacion ? doc.Verificacion : '', 
            PolizaDeSeguros: doc.PolizaDeSeguros ? doc.PolizaDeSeguros : '', 
            tarjetaDeCirculacion: doc.tarjetaDeCirculacion ? doc.tarjetaDeCirculacion : '', 
            fechaVigenciaPolizaSeguro: doc.fechaVigenciaPolizaSeguro ? doc.fechaVigenciaPolizaSeguro : '', 
            fechaVerificacion: doc.fechaVerificacion ? doc.fechaVerificacion : ''
          };

        }else{
          this.mostrarError("No es posible ver los documentos por el momento");
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
