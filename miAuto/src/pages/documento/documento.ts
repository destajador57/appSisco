import { Component, Pipe, PipeTransform } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-documento',
  templateUrl: 'documento.html',
})
export class DocumentoPage {

  url: string;
  esPdf: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {

    this.url = navParams.get('url');
    var ext = this.url.substring(this.url.lastIndexOf('.') + 1);
    this.esPdf = ext == 'pdf';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentoPage');
  }

  photoURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  salir(){
    this.navCtrl.setRoot(LoginPage);
  };
}
