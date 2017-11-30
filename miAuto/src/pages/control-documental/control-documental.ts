import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-control-documental',
  templateUrl: 'control-documental.html',
})
export class ControlDocumentalPage {

  documento: {placas: string, tenencia: string, verificacion: string, poliza: string, circulacion: string, multas: string };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.documento = {
      placas:'https://oficinavirtual.ugr.es/apli/solicitudPAU/test.pdf',
      tenencia:'https://oficinavirtual.ugr.es/apli/solicitudPAU/test.pdf',
      verificacion:'https://oficinavirtual.ugr.es/apli/solicitudPAU/test.pdf',
      poliza:'https://oficinavirtual.ugr.es/apli/solicitudPAU/test.pdf',
      circulacion:'https://oficinavirtual.ugr.es/apli/solicitudPAU/test.pdf',
      multas:'https://oficinavirtual.ugr.es/apli/solicitudPAU/test.pdf',
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ControlDocumentalPage');
  }

  descargar(url){
    console.log(url);
  }
}
