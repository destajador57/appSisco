import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { ServicioPage } from '../servicio/servicio';
import { BuscarTallerPage } from '../buscar-taller/buscar-taller';

@IonicPage()
@Component({
  selector: 'page-mantenimiento',
  templateUrl: 'mantenimiento.html',
})
export class MantenimientoPage {
  private chart: AmChart;
  servicios: Array<{km: number, id: number, aplicado: boolean}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber, private AmCharts: AmChartsService) {
    this.servicios = [];
    this.servicios.push({km:25,id:1,aplicado:true});
    this.servicios.push({km:50,id:2,aplicado:true});
    this.servicios.push({km:75,id:3,aplicado:true});
    this.servicios.push({km:100,id:4,aplicado:false});
  }

  public showDetalleServicio(servicio){
    if(servicio.aplicado){
      this.navCtrl.push(ServicioPage,true);
    }else{
      this.navCtrl.push(BuscarTallerPage,true);
    }
  }


  ngAfterViewInit() {

    var kilometraje = 80000;

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
}