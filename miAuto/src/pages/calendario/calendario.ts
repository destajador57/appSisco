import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfirmacionPage } from '../confirmacion/confirmacion';
import { DatePicker } from '@ionic-native/date-picker';

@IonicPage()
@Component({
  selector: 'page-calendario',
  templateUrl: 'calendario.html',
})
export class CalendarioPage {

  fecha: any;
  cita: any;
  calendar:{currentDate:any,locale:any};
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private datePicker: DatePicker) {
    this.cita = navParams.get('cita');
    this.fecha = {};

    this.calendar = {
      locale: 'es-MX',
      currentDate: new Date(Date.UTC(2014, 4, 8))

  };

  this.datePicker.show({
    date: new Date(),
    mode: 'date',
    androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
  }).then(
    date => console.log('Got date: ', date),
    err => console.log('Error occurred while getting date: ', err)
  );
  }
 
  onEventSelected(evento){
    console.log(evento);
    console.log('despues de seleccionarla.');
    console.log(this.calendar.currentDate);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarioPage');
  }

  confirmarServicio(){
console.log(this.fecha);
  }

  onDaySelect(evento){
    console.log('listo para enviar a confirmar');
    console.log(evento);
    console.log(this.cita);
    this.navCtrl.push(ConfirmacionPage,{cita: {
      idServicio: this.cita.idServicio,
      idUsuario: this.cita.idUsuario,
      idContratoOperacion: this.cita.idContratoOperacion,
      idUnidad: this.cita.idUnidad,

      Servicio:this.cita.Servicio,
      nombre:this.cita.nombre,
      modelo: this.cita.modelo,
      nombreMarca: this.cita.nombreMarca,

      direccion: this.cita.direccion,
      idTaller: this.cita.idTaller,
      nombreComercial: this.cita.nombreComercial,

      fecha: evento.year + ''  +  evento.month + '' + evento.date
    }});
  }

}
