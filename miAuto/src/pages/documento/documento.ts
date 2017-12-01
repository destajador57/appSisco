import { Component, Pipe, PipeTransform } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-documento',
  templateUrl: 'documento.html',
})
// @Pipe({ name: 'safe' })
export class DocumentoPage {

  url: string;
  esPdf: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {
    //var permisos = navParams.get('url');

    this.url = navParams.get('url');

    console.log('dentro de docuemntsos');
    console.log(this.url);
    var ext = this.url.substring(this.url.lastIndexOf('.') + 1);
    this.esPdf = ext == 'pdf';
    //this.url = 'https://vadimdez.github.io/ng2-pdf-viewer/pdf-test.pdf';
    console.log(this.url);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentoPage');
  }

  photoURL() {
    //return this.sanitizer.bypassSecurityTrustUrl(this.url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  salir(){
    //this.rootPage = LoginPage;
    this.navCtrl.setRoot(LoginPage);
    console.log('deberia funcioan');
  };
}
