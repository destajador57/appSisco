import { Component, OnInit  } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { AutoCompletadoPage } from '../auto-completado/auto-completado';
import { LoginPage } from '../login/login';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ConfirmacionPage } from '../confirmacion/confirmacion';

declare var google:any;

@IonicPage()
@Component({
  selector: 'page-buscar-taller',
  templateUrl: 'buscar-taller.html',
})
export class BuscarTallerPage implements OnInit {

  address:any = {
    place: '',
    set: false,
};
placesService:any;
mapa: any;
markers = [];
placedetails: any;

  map: GoogleMap;


  talleres: Array<{
    RFC:string,
    direccion:string,
    idProveedor:number,
    idTaller: number,
    km : string,
    latitud:string,
    longitud:string,
    nombre:string,
    nombreComercial:string,
    order:number,
    razonSocial:string}>;

  cita: any;
 
    // citaConTaller:{
    //   cita: { servicioSeleccionado: {idServicio: number, Servicio: number},
    //   unidadSeleccionada: {nombre: string, idUnidad: number}
    //     },
    //     taller:{
    //       RFC:string,
    //       direccion:string,
    //       idProveedor:number,
    //       idTaller: number,
    //       km : string,
    //       latitud:string,
    //       longitud:string,
    //       nombre:string,
    //       nombreComercial:string,
    //       order:number,
    //       razonSocial:string}
    // }

ubicacion:{lat:number,lng:number};

  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber, public geolocation: Geolocation, private alertCtrl: AlertController, public modalCtrl: ModalController, public userService: UserServiceProvider) {

    this.cita = navParams.get('cita');
    console.log('datos completos de la cita');
    console.log(this.cita);

    this.ubicacion = {lat:0,lng:0};

    this.talleres = [];
    // this.talleres.push({nombre: 'Taller el Brandom', distancia: 1});
    // this.talleres.push({nombre: 'Taller el Frank', distancia: 23});
    // this.talleres.push({nombre: 'Taller el kevin', distancia: 27});
  }

  ngOnInit() {
    this.initMap();
    this.initPlacedetails();
console.log('invoca el init');
}

private initMap() {
  this.geolocation.getCurrentPosition().then((position) => {
  console.log('Esta inicializando el mapa ');
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  this.ubicacion.lat = position.coords.latitude;
  this.ubicacion.lng = position.coords.longitude;

  this.userService.GetTalleres(this.cita.idUnidad, this.ubicacion.lat ,this.ubicacion.lng)
  .subscribe(
  (data) => { // Success
    console.log('invocacion del servico de tallers JOSE esta chingando');
    console.log(this.cita.idUnidad);
    console.log(this.ubicacion.lat);
    console.log(this.ubicacion.lng);
      console.log(data);
      if(data && data != null && data.length > 0){
        this.talleres = data;
      }
  },
  (error) =>{
    console.log(error);
    //this.mostrarError("No es posible registrarse por el momento.");
  }
);

  var point = {lat: position.coords.latitude, lng: position.coords.longitude }; 
  let divMap = (<HTMLInputElement>document.getElementById('map'));
  this.mapa = new google.maps.Map(divMap, {
      center: point,
      zoom: 11,
      disableDefaultUI: true,
      draggable: false,
      zoomControl: true
  },(error)=>{
    console.log(error);
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: error,
      buttons: ['OK']
    });
    alert.present();
});
// position: {
//   lat: place.geometry.location.lat(),
//   lng: place.geometry.location.lng()
// }

var marker = new google.maps.Marker({
  map:this.mapa,
  position: {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  }
});    
//marker.setMap(this.mapa);
this.markers.push(marker);

})

}

private initPlacedetails() {
  this.placedetails = {
      address: '',
      lat: '',
      lng: '',
      components: {
          route: { set: false, short:'', long:'' },                           // calle 
          street_number: { set: false, short:'', long:'' },                   // numero
          sublocality_level_1: { set: false, short:'', long:'' },             // barrio
          locality: { set: false, short:'', long:'' },                        // localidad, ciudad
          administrative_area_level_2: { set: false, short:'', long:'' },     // zona/comuna/partido 
          administrative_area_level_1: { set: false, short:'', long:'' },     // estado/provincia 
          country: { set: false, short:'', long:'' },                         // pais
          postal_code: { set: false, short:'', long:'' },                     // codigo postal
          postal_code_suffix: { set: false, short:'', long:'' },              // codigo postal - sufijo
      }    
  };        
} 

showModal() {
  this.reset();
  // show modal|
  let modal = this.modalCtrl.create(AutoCompletadoPage);
  modal.onDidDismiss(data => {
      console.log('page > modal dismissed > data > ', data);
      if(data){
          this.address.place = data.description;
          // get details
          this.getPlaceDetail(data.place_id);
      }                
  })
  modal.present();
}

private reset() {
  this.initPlacedetails();
  this.address.place = '';
  this.address.set = false;
}

private getPlaceDetail(place_id:string):void {
  var self = this;
  var request = {
      placeId: place_id
  };
  console.log('identificador del lugar');
  console.log(place_id);
 
  this.placesService = new google.maps.places.PlacesService(this.mapa);
  this.placesService.getDetails(request, callback);
  function callback(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
          console.log('page > getPlaceDetail > place > ', place);
          // set full address
          self.placedetails.address = place.formatted_address;
          self.placedetails.lat = place.geometry.location.lat();
          self.placedetails.lng = place.geometry.location.lng();

          // this.localidad.lat = place.geometry.location.lat();
          // this.localidad.lng = place.geometry.location.lng();

          for (var i = 0; i < place.address_components.length; i++) {
              let addressType = place.address_components[i].types[0];
              let values = {
                  short_name: place.address_components[i]['short_name'],
                  long_name: place.address_components[i]['long_name']
              }
              if(self.placedetails.components[addressType]) {
                  self.placedetails.components[addressType].set = true;
                  self.placedetails.components[addressType].short = place.address_components[i]['short_name'];
                  self.placedetails.components[addressType].long = place.address_components[i]['long_name'];
              }                                     
          }                  
          // set place in map
          self.mapa.setCenter(place.geometry.location);
          self.createMapMarker(place);




          
          self.ubicacion.lat = place.geometry.location.lat();
          self.ubicacion.lng = place.geometry.location.lng();
          self.userService.GetTalleres(self.cita.idUnidad, self.ubicacion.lat ,self.ubicacion.lng)

          .subscribe(
          (data) => { // Success
              console.log(data);
              if(data && data != null && data.length > 0){
                self.talleres = data;
              }
          },
          (error) =>{
            console.log(error);
            //this.mostrarError("No es posible registrarse por el momento.");
          }
        );





          if(self.map != null){
            console.log('self.map');
            console.log(self.map);
            //self.map
            self.map.addMarker({
              title: 'Ionic',
              icon: 'blue',
              animation: 'DROP',
              position: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
              }
            })
            .then(marker => {
              marker.on(GoogleMapsEvent.MARKER_CLICK)
                .subscribe(() => {
                  alert('clicked');
                });
            });
          }else{
            console.log(self.map);
          }
          




          // populate
          self.address.set = true;
          console.log('page > getPlaceDetail > details > ', self.placedetails);
      }else{
          console.log('page > getPlaceDetail > status > ', status);
      }
  }
}

  ionViewDidLoad() {
    console.log('Ejecutando mapa');
    this.loadMap();
   }

   loadMap() {
    this.geolocation.getCurrentPosition().then((position) => {
    console.log('DIRECCION DEL MAPA ES');
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
        let mapOptions: GoogleMapOptions = {
          camera: {
            target: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            zoom: 11,
            tilt: 30
          }
        };
    GoogleMaps
        //this.map = this.googleMaps.create('map_canvas', mapOptions);
        this.map = GoogleMaps.create('map_canvas', mapOptions);

        // Wait the MAP_READY before using any methods.
        this.map.one(GoogleMapsEvent.MAP_READY)
          .then(() => {
            console.log('Map is ready!');
            
            

            // Now you can use all methods safely.
            this.map.addMarker({
                title: 'Ionic',
                icon: 'blue',
                animation: 'DROP',
                position: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                }
              })
              .then(marker => {
                marker.on(GoogleMapsEvent.MARKER_CLICK)
                  .subscribe(() => {
                    alert('clicked');
                  });
              });
    
          });
        },(error)=>{
          console.log(error);
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: error,
            buttons: ['OK']
          });
          alert.present();
      });
    }

    private createMapMarker(place:any):void {

      var placeLoc = place.geometry.location;

      console.log('marker');
      console.log(marker);

      if(this.markers && this.markers.length > 0){
        console.log('si hay uno');

        
        this.markers[0].setMap(null);
        var marker = new google.maps.Marker({
          map: this.mapa,
          position: placeLoc
        });    
        this.markers.push(marker);


        this.markers.forEach((value,idx)=>{
          this.markers.splice(idx,1);
        });
      }else{
        console.log('no hay nada');
        var marker = new google.maps.Marker({
          map: this.mapa,
          position: placeLoc
        });    
        this.markers.push(marker);
      }
  }

      public showTallerDetalle(taller){
        console.log(taller);
        this.navCtrl.push(ConfirmacionPage,{cita:{
          idServicio: this.cita.idServicio,
          idUsuario: this.cita.idUsuario,
          idContratoOperacion: this.cita.idContratoOperacion,
          idUnidad: this.cita.idUnidad,
    
          Servicio:this.cita.Servicio,
          nombre:this.cita.nombre,
          modelo: this.cita.modelo,
          nombreMarca: this.cita.nombreMarca,

          direccion: taller.direccion,
          idTaller: taller.idTaller,
          nombreComercial: taller.nombreComercial
        }});
      }
 
  public llamarCallCenter(){
    this.callNumber.callNumber('5575839991', true)
    .then(()=> console.log('Esta llamando a call center'))
    .catch(()=> console.log('fallo la llamada'));
  }

salir(){
    //this.rootPage = LoginPage;
    this.navCtrl.setRoot(LoginPage);
    console.log('deberia funcioan');
  };
}