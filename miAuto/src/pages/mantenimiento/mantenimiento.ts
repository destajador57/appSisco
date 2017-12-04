import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  kilometraje:{cienMil:number,mil:number,cien:number,diez:number,uno:number};

  private chart: AmChart;
  servicios: Array<{idServicio: number, Servicio: number}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber, private AmCharts: AmChartsService, public userService: UserServiceProvider) {

    this.cita = navParams.get('cita');
    console.log(this.cita);

    this.servicioSeleccionado = 0;

    this.kilometraje = {
      cienMil:0,
      mil:0,
      cien:0,
      diez:0,
      uno:0
    };

    this.servicios = [];
  }

  public showDetalleServicio(servicio){
    if(servicio.aplicado){
      this.navCtrl.push(ServicioPage,true);
    }else{
      this.navCtrl.push(BuscarTallerPage,true);
    }
  }


  ngAfterViewInit() {

    var kilometraje = 15000;

    this.chart = this.AmCharts.makeChart("chartdiv", {
      "theme": "light",
      "type": "gauge",
      "axes": [{
        "topTextFontSize": 20,
        "topTextYOffset": 70,
        "axisColor": "#31d6ea",
        "topText": 'Tienes ' + kilometraje + ' kilometros',
        "axisThickness": 1,
        "endValue": 100000,
        "gridInside": false,
        "inside": false,
        "radius": "50%",
        "valueInterval": 25000,
        "tickColor": "#67b7dc",
        "startAngle": -90,
        "endAngle": 90,
        "unit": "km",
        "labelsEnabled" : false,
        "bandOutlineAlpha": 0,
        "bands": [{
          "color": "#0080ff",
          "endValue": 100000,
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
        "value": kilometraje
      }]
    });

    
    this.userService.CitaServicios()
    .subscribe(
    (data) => { // Success
        console.log(data);
        if(data && data != null && data.length > 0){
          //var doc = data[0];
          //this.servicios = {idServicio: number, Servicio: number}
          this.servicios = data;
          // this.documento ={
          //   placas: doc.placas ? doc.placas : '', 
          //   Tenencia: doc.Tenencia ? doc.Tenencia : '', 
          //   Verificacion: doc.Verificacion ? doc.Verificacion : '', 
          //   PolizaDeSeguros: doc.PolizaDeSeguros ? doc.PolizaDeSeguros : '', 
          //   tarjetaDeCirculacion: doc.tarjetaDeCirculacion ? doc.tarjetaDeCirculacion : '', 
          //   fechaVigenciaPolizaSeguro: doc.fechaVigenciaPolizaSeguro ? doc.fechaVigenciaPolizaSeguro : '', 
          //   fechaVerificacion: doc.fechaVerificacion ? doc.fechaVerificacion : ''
          // };

        }else{
          this.mostrarError("No es posible ver los documentos por el momento");
        }
      
		},
		(error) =>{
			this.mostrarError("No es posible registrarse por el momento.");
		}
	);
  }

  mostrarError(mensaje){
    
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

  public llamarCallCenter(){
    this.callNumber.callNumber('5575839991', true)
    .then(()=> console.log('Esta llamando a call center'))
    .catch(()=> console.log('fallo la llamada'));
  }

  confirmarServicio(){
    console.log(this.servicioSeleccionado);
    this.navCtrl.push(BuscarTallerPage,{cita:{
      idServicio: this.servicioSeleccionado.idServicio,
      idUsuario: this.cita.idUsuario,
      idContratoOperacion: this.cita.idContratoOperacion,
      idUnidad: this.cita.idUnidad,

      Servicio:this.servicioSeleccionado.Servicio,
      nombre:this.cita.nombre,
      modelo: this.cita.modelo,
      nombreMarca: this.cita.nombreMarca
    }});
  }

  salir(){
    //this.rootPage = LoginPage;
    this.navCtrl.setRoot(LoginPage);
    console.log('deberia funcioan');
  };
}