import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';

declare var google: any;

@Component({
  selector: 'page-auto-completado',
  templateUrl: 'auto-completado.html',
})
export class AutoCompletadoPage implements OnInit {

  direccionesAutoCompletadas: any;
  autocomplete: any;
  acService: any;
  placesService: any;

  constructor(public viewCtrl: ViewController) {
  }

  ngOnInit() {
    this.acService = new google.maps.places.AutocompleteService();
    this.direccionesAutoCompletadas = [];
    this.autocomplete = {
      query: ''
    };
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  eligeDireccion(item: any) {
    this.viewCtrl.dismiss(item);
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
      this.direccionesAutoCompletadas = [];
      return;
    }
    let self = this;
    let config = {
      types: ['geocode'],
      input: this.autocomplete.query,
      componentRestrictions: { country: 'MX' }
    }
    this.acService.getPlacePredictions(config, function (predictions, status) {
      self.direccionesAutoCompletadas = [];
      if (predictions && predictions.length > 0) {
        predictions.forEach(function (prediction) {
          self.direccionesAutoCompletadas.push(prediction);
        });
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AutoCompletadoPage');
  }

}
