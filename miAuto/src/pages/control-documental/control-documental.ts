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

  cita:any;

  documento: {
    placas: string, 
    Tenencia: string, 
    Verificacion: string, 
    PolizaDeSeguros: string, 
    tarjetaDeCirculacion: string,
    fechaVigenciaPolizaSeguro: string,
    fechaVigenciaPolizaSeguroVencida: string,
    fechaVigenciaTenencia: string,
    fechaVigenciaTenenciaVencida: string,
    fechaVerificacion: string,
    fechaVerificacionVencida : string
  };

  constructor(public navCtrl: NavController, public platform: Platform, public navParams: NavParams, private alertCtrl: AlertController, public userService: UserServiceProvider) {

    this.cita = navParams.get('cita');

    this.documento = {
      placas: '', 
      Tenencia: '', 
      Verificacion: '', 
      PolizaDeSeguros: '', 
      tarjetaDeCirculacion: '',
      fechaVigenciaPolizaSeguro: '',
      fechaVigenciaPolizaSeguroVencida: '',
      fechaVigenciaTenencia: '',
      fechaVigenciaTenenciaVencida: '',
      fechaVerificacion: '',
      fechaVerificacionVencida : ''
    };
  }

  descargar(url){
    console.log('lo que va a mandar');
    console.log(url);
    this.navCtrl.push(DocumentoPage, {url: url});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ControlDocumentalPage');

    this.userService.GetDocsXUni(this.cita.idUnidad)
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
            fechaVigenciaPolizaSeguroVencida: doc.fechaVigenciaPolizaSeguroVencida ? doc.fechaVigenciaPolizaSeguroVencida : '',
            fechaVigenciaTenencia: doc.fechaVigenciaTenencia ? doc.fechaVigenciaTenencia : '',
            fechaVigenciaTenenciaVencida: doc.fechaVigenciaTenenciaVencida ? doc.fechaVigenciaTenenciaVencida : '',
            fechaVerificacion: doc.fechaVerificacion ? doc.fechaVerificacion : '',
            fechaVerificacionVencida : doc.fechaVerificacionVencida ? doc.fechaVerificacionVencida : ''
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
