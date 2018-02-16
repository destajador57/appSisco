import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { ConfirmacionPage } from '../confirmacion/confirmacion';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-calendario',
  templateUrl: 'calendario.html',
})
export class CalendarioPage {

  fecha: any;
  cita: any;
  // calendar: { currentDate: any, locale: any };
  fechaActual: any;
  fechaMin: any;
  fechaMaxima: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController, 
    private toast: Toast,
    private platform: Platform) {

    this.cita = navParams.get('cita');
    this.fecha = {};

    //tiempo de zona horaria de mexico
    //var tzoffset = (new Date()).getTimezoneOffset() * 60000;

    let hoy = this.estableceFechaInicial();

    //Prueba de los dias
    //hoy.setDate(hoy.getDate() + 8);

    // var diaSemana = hoy.getDay();

    // switch (diaSemana) {
    //   case 3:
    //     hoy.setDate(hoy.getDate() + 5);
    //     break;
    //   case 4:
    //     hoy.setDate(hoy.getDate() + 5);
    //     break;
    //   case 5:
    //     hoy.setDate(hoy.getDate() + 5);
    //     break;
    //   case 6:
    //     hoy.setDate(hoy.getDate() + 4);
    //     break;
    //   default:
    //     hoy.setDate(hoy.getDate() + 3);
    //     break;
    // }

    this.fechaActual = hoy.toISOString().slice(0, -1);
    this.fechaMin = hoy.toISOString().slice(0, -1)
    this.fechaMaxima = hoy.getFullYear() + 1;
    // this.calendar = {
    //   locale: 'es-MX',
    //   currentDate: new Date(Date.UTC(2014, 4, 8))
    // };

    // console.log(this.fechaActual);
    // console.log(this.fechaMin);
    // console.log(this.fechaMaxima);

    // this.datePicker.show({
    //   date: new Date(),
    //   mode: 'date',
    //   androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    // }).then(
    //   date => console.log('Got date: ', date),
    //   err => console.log('Error occurred while getting date: ', err)
    //   );
  }

  onEventSelected(evento) {
    console.log('algo pasa')
    console.log(evento);
  }

  public getData(){
    console.log(this.fechaActual);
    console.log(this.fechaActual);
    let fechaActualDate = new Date(this.fechaActual);
    console.log(fechaActualDate);

    let diaSemana = fechaActualDate.getDay();

    switch (diaSemana) {
      case 0:
      case 6:
      console.log('va a cambiar la fecha');
      let hoy = this.estableceFechaInicial();
      this.fechaActual = hoy.toISOString().slice(0, -1);

      this.platform.ready().then(() =>
      {
        if(this.platform.is('cordova')){
          this.toast.show(`Debes elegir un dia habíl`, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        }else{
let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Debes elegir un dia habíl',
        buttons: ['OK']
      });
      alert.present();
        }
      }
      );
      
        break;
      default:
      console.log('el dia de la semana es: ' + diaSemana);
        break;
    }
    console.log('valida fecha');
  }

  estableceFechaInicial(): Date{

    let tzoffset = (new Date()).getTimezoneOffset() * 60000;

    let hoy = new Date(Date.now() - tzoffset);

    //Prueba de los dias
    //hoy.setDate(hoy.getDate() + 8);

    let diaSemana = hoy.getDay();

    switch (diaSemana) {
      case 3:
        hoy.setDate(hoy.getDate() + 5);
        break;
      case 4:
        hoy.setDate(hoy.getDate() + 5);
        break;
      case 5:
        hoy.setDate(hoy.getDate() + 5);
        break;
      case 6:
        hoy.setDate(hoy.getDate() + 4);
        break;
      default:
        hoy.setDate(hoy.getDate() + 3);
        break;
    }

    return hoy;
  }

  // public event(data: Date): void {
  //   console.log('el evento');
  //   this.fechaActual = data;
  // }
  // public setDate(date: Date) {
  //   console.log(date.getDay());
  //   console.log('establece');
  //   console.log(date);
  //   //this.initDate = date;
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarioPage');
  }

  // validaFechas() {
  //   var respuesta = false;
  //   var tzoffset = (new Date()).getTimezoneOffset() * 60000;
  //   var ahora = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

  //   var fecha = this.fechaActual.substring(0, 4) +
  //     this.fechaActual.substring(5, 7) +
  //     this.fechaActual.substring(8, 10) + ' ' +
  //     this.fechaActual.substring(11, 19);

  //   if (this.fechaActual.substring(0, 10) == ahora.substring(0, 10)) {

  //     if ((Number(ahora.substring(11, 13)) + 3) > Number(this.fechaActual.substring(11, 13))) {
  //       respuesta = false;
  //     } else {
  //       respuesta = true;
  //     }
  //   } else {
  //     respuesta = true;
  //   }
  //   return respuesta;
  // }

  confirmarServicio() {
    
    // var fecha = this.fechaActual.substring(0, 4) +
    //   this.fechaActual.substring(5, 7) +
    //   this.fechaActual.substring(8, 10) + ' ' +
    //   this.fechaActual.substring(11, 19);

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

        fecha: this.fechaActual
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
