import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, AlertController } from 'ionic-angular';
import { DocumentoPage } from '../documento/documento';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-control-documental',
  templateUrl: 'control-documental.html',
})
export class ControlDocumentalPage {

  documento: {placas: string, tenencia: string, verificacion: string, poliza: string, circulacion: string, multas: string };

  constructor(public navCtrl: NavController, public platform: Platform, public navParams: NavParams, private alertCtrl: AlertController,) {

    this.documento = {
      placas: 'https://vadimdez.github.io/ng2-pdf-viewer/pdf-test.pdf' ,
      tenencia:'https://vadimdez.github.io/ng2-pdf-viewer/pdf-test.pdf',
      verificacion:'https://oficinavirtual.ugr.es/apli/solicitudPAU/test.pdf',
      poliza:'https://oficinavirtual.ugr.es/apli/solicitudPAU/test.pdf',
      circulacion:'https://oficinavirtual.ugr.es/apli/solicitudPAU/test.pdf',
      multas:'https://oficinavirtual.ugr.es/apli/solicitudPAU/test.pdf',
    };
  }

  descargar(url){
    this.navCtrl.push(DocumentoPage, {url: url});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ControlDocumentalPage');
  }
}
