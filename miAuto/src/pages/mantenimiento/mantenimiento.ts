import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { ServicioPage } from '../servicio/servicio';
import { BuscarTallerPage } from '../buscar-taller/buscar-taller';
import { LoginPage } from '../login/login';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-mantenimiento',
  templateUrl: 'mantenimiento.html',
})
export class MantenimientoPage {
  //Servicio de numero kilometros
  cita: any;
  servicioSeleccionado: any;
  kilometraje: { cienMil: number, mil: number, cien: number, diez: number, uno: number };
  takometro: { longitud: number, latitud: number, kilometros: number };

  private chart: AmChart;
  servicios: Array<{ idServicio: number, Servicio: number }>;

  serviciosHechos: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber, private AmCharts: AmChartsService, public userService: UserServiceProvider, private alertCtrl: AlertController,) {

    this.cita = navParams.get('cita');
    this.servicioSeleccionado = 0;

    this.takometro = {
      longitud: 0,
      latitud: 0,
      kilometros: 0
    };

    this.kilometraje = {
      cienMil: 0,
      mil: 0,
      cien: 0,
      diez: 0,
      uno: 0
    };

    this.servicios = [];

    this.userService.GetOrdXUni(this.cita.idUnidad)
      .subscribe(
      (data) => { // Success
        this.serviciosHechos = data;
      },
      (error) => {
        this.mostrarError('Por el momento no es posible calificar');
      }
      );
  }

  public showDetalleServicio(servicio) {
    if (servicio.aplicado) {
      this.navCtrl.push(ServicioPage, true);
    } else {
      this.navCtrl.push(BuscarTallerPage, true);
    }
  }

  private createChart() {
    // console.log(this.cita);
    // var kilometraje = 15;

    this.chart = this.AmCharts.makeChart("chartdiv", {
      "theme": "light",
      "type": "gauge",
      "axes": [{
        "topTextFontSize": 20,
        "topTextYOffset": 70,
        "axisColor": "#31d6ea",
        "topText": 'La unidad tiene: ' + this.takometro.kilometros + ' km',
        "axisThickness": 1,
        "endValue": 100,
        "gridInside": false,
        "inside": false,
        "radius": "50%",
        "valueInterval": 25,
        "tickColor": "#67b7dc",
        "startAngle": -90,
        "endAngle": 90,
        "unit": "km",
        "labelsEnabled": false,
        "bandOutlineAlpha": 0,
        "bands": [{
          "color": "#0080ff",
          "endValue": 100,
          "innerRadius": "105%",
          "radius": "170%",
          "gradientRatio": [0.5, 0, -0.5],
          "startValue": 0
        }, {
          "color": "#3cd3a3",
          "endValue": 0,
          "innerRadius": "105%",
          "radius": "170%",
          "gradientRatio": [0.5, 0, -0.5],
          "startValue": 0
        }]
      }],
      "arrows": [{
        "alpha": 1,
        "innerRadius": "35%",
        "nailRadius": 0,
        "radius": "170%",
        "value": this.takometro.kilometros * .001 // para mostrar miles en una grafica configurada en 100%
      }]
    });
  }


  ngAfterViewInit() {

    console.log('----ESTE ES EL VIN QUE SERIA ENVIADO AL NUEVO SERVICIO');
    console.log(this.cita.vin);
    //this.userService.GetKilometros('3C4NJCCB7JT148085')
    this.userService.GetKilometros(this.cita.vin)
      .subscribe(
      (data) => { // Success
        if (data && data != null) {
          this.takometro = data;
          this.createChart();
        } else {
          this.mostrarError("No es posible ver los documentos por el momento");
        }

      },
      (error) => {
        this.mostrarError("No es posible registrarse por el momento.");
      }
      );

    this.userService.CitaServicios()
      .subscribe(
      (data) => { // Success
        if (data && data != null && data.length > 0) {
          this.servicios = data;
        } else {
          this.mostrarError("No es posible ver los documentos por el momento");
        }
      },
      (error) => {
        this.mostrarError("No es posible registrarse por el momento.");
      }
      );
  }

  mostrarError(mensaje) {

    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: mensaje,
      buttons: ['OK']
    });
    alert.present();
  }

  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }

  public llamarCallCenter() {
    this.callNumber.callNumber('5575839991', true)
      .then(() => console.log('Esta llamando a call center'))
      .catch(() => console.log('fallo la llamada'));
  }

  confirmarServicio() {
    this.navCtrl.push(BuscarTallerPage, {
      cita: {
        idServicio: this.servicioSeleccionado.idServicio,
        idUsuario: this.cita.idUsuario,
        idContratoOperacion: this.cita.idContratoOperacion,
        idUnidad: this.cita.idUnidad,

        Servicio: this.servicioSeleccionado.Servicio,
        nombre: this.cita.nombre,
        modelo: this.cita.modelo,
        nombreMarca: this.cita.nombreMarca
      }
    });
  }

  salir() {
    this.navCtrl.setRoot(LoginPage);
  };
}