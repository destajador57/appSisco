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

    let hoy = this.estableceFechaInicial();
    this.fechaActual = hoy.toISOString().slice(0, -1);
    this.fechaMin = hoy.toISOString().slice(0, -1)
    this.fechaMaxima = hoy.getFullYear() + 1;
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarioPage');
  }

  confirmarServicio() {
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
