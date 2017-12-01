import { Component, Pipe, PipeTransform } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-documento',
  templateUrl: 'documento.html',
})
// @Pipe({ name: 'safe' })
export class DocumentoPage {

  url: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {

    this.url = navParams.get('url');
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

}
