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
  calendar: { currentDate: any, locale: any };
  fechaActual: any;
  fechaMin: any;
  fechaMaxima: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private datePicker: DatePicker) {
    this.cita = navParams.get('cita');
    this.fecha = {};
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    this.fechaActual = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    this.fechaMin = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    this.fechaMaxima = new Date().getFullYear() + 1;
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

  onEventSelected(evento) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarioPage');
  }

  validaFechas() {
    var respuesta = false;
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    var ahora = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

    var fecha = this.fechaActual.substring(0, 4) +
      this.fechaActual.substring(5, 7) +
      this.fechaActual.substring(8, 10) + ' ' +
      this.fechaActual.substring(11, 19);

    if (this.fechaActual.substring(0, 10) == ahora.substring(0, 10)) {

      if ((Number(ahora.substring(11, 13)) + 3) > Number(this.fechaActual.substring(11, 13))) {
        respuesta = false;
      } else {
        respuesta = true;
      }
    } else {
      respuesta = true;
    }
    return respuesta;
  }

  confirmarServicio() {
    console.log(this.fechaActual);
    var fecha = this.fechaActual.substring(0, 4) +
      this.fechaActual.substring(5, 7) +
      this.fechaActual.substring(8, 10) + ' ' +
      this.fechaActual.substring(11, 19);

    this.navCtrl.push(ConfirmacionPage, {
      cita: {
        idServicio: this.cita.idServicio,
        idUsuario: this.cita.idUsuario,
        idContratoOperacion: this.cita.idContratoOperacion,
        idUnidad: this.cita.idUnidad,

        Servicio: this.cita.Servicio,
        nombre: this.cita.nombre,
        modelo: this.cita.modelo,
        nombreMarca: this.cita.nombreMarca,

        direccion: this.cita.direccion,
        idTaller: this.cita.idTaller,
        nombreComercial: this.cita.nombreComercial,

        fecha: fecha
      }
    });
  }

  onDaySelect(evento) {
    this.navCtrl.push(ConfirmacionPage, {
      cita: {
        idServicio: this.cita.idServicio,
        idUsuario: this.cita.idUsuario,
        idContratoOperacion: this.cita.idContratoOperacion,
        idUnidad: this.cita.idUnidad,

        Servicio: this.cita.Servicio,
        nombre: this.cita.nombre,
        modelo: this.cita.modelo,
        nombreMarca: this.cita.nombreMarca,

        direccion: this.cita.direccion,
        idTaller: this.cita.idTaller,
        nombreComercial: this.cita.nombreComercial,

        fecha: evento.year + '' + evento.month + '' + evento.date
      }
    });
  }

}
