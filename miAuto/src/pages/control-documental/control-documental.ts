import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import {Transfer, TransferObject} from '@ionic-native/transfer';
//import {File} from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-control-documental',
  templateUrl: 'control-documental.html',
})
export class ControlDocumentalPage {

  documento: {placas: string, tenencia: string, verificacion: string, poliza: string, circulacion: string, multas: string };

  constructor(public navCtrl: NavController, public navParams: NavParams, private transfer: FileTransfer, private file: File) {
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
    const fileTransfer: FileTransferObject = this.transfer.create();

    console.log(this.file.dataDirectory);
      //const url = 'http://www.example.com/file.pdf';
      fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
        console.log('download complete: ' + entry.toURL());
      }, (error) => {
        // handle error
      });
    }
}
