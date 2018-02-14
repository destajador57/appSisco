
import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { Geolocation } from '@ionic-native/geolocation';
import { AutoCompletadoPage } from '../auto-completado/auto-completado';
import { LoginPage } from '../login/login';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { CalendarioPage } from '../calendario/calendario';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ModalController
} from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-buscar-taller',
  templateUrl: 'buscar-taller.html',
})
export class BuscarTallerPage implements OnInit {
 
  address: any = {
    place: '',
    set: false,
  };
  
  placesService: any;
  mapa: any;
  markers = [];
  placedetails: any;
  map: GoogleMap;
  cita: any;

  ubicacion: { 
    lat: number, 
    lng: number 
  };
  
  talleres: Array<{
    RFC: string,
    direccion: string,
    idProveedor: number,
    idTaller: number,
    km: string,
    latitud: string,
    longitud: string,
    nombre: string,
    nombreComercial: string,
    order: number,
    razonSocial: string
  }>;
 
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private callNumber: CallNumber, 
    public geolocation: Geolocation, 
    private alertCtrl: AlertController, 
    public modalCtrl: ModalController, 
    public userService: UserServiceProvider) {

    this.cita = navParams.get('cita');
    console.log('-----------------cita parametro');
    console.log(this.cita);
    this.ubicacion = { lat: 0, lng: 0 };
    this.talleres = [];
  }

  ngOnInit() {
    this.initMap();
    this.initPlacedetails();
  }
 
  private initMap() {
    console.log('carga de mapas');
    this.geolocation.getCurrentPosition().then((position) => {
      console.log('me trajo la posisicion');
      console.log(position.coords);
      this.ubicacion.lat = position.coords.latitude;
      this.ubicacion.lng = position.coords.longitude;

      console.log('va a invocar el servicio');
      this.userService.GetTalleres(this.cita.idUnidad, this.ubicacion.lat, this.ubicacion.lng)
        .subscribe(
        (data) => { // Success
          console.log('despues de la ejecucion para obtener los talleres');
          console.log(data);
          if (data && data != null && data.length > 0) {
            console.log('carga inicial de los talleres');
            console.log(data);
            this.talleres = data;
          }
        },
        (error) => {
          console.log('ocurrio un error');
          console.log(error);
        }
        );

      var point = { lat: position.coords.latitude, lng: position.coords.longitude };
      let divMap = (<HTMLInputElement>document.getElementById('map'));
      this.mapa = new google.maps.Map(divMap, {
        center: point,
        zoom: 11,
        disableDefaultUI: true,
        draggable: false,
        zoomControl: true
      }, (error) => {
        console.log(error);
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: error,
          buttons: ['OK']
        });
        alert.present();
      });
       
      var marker = new google.maps.Marker({
        map: this.mapa,
        position: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
      
      this.markers.push(marker);

    })

  }
   
  private initPlacedetails() {
    this.placedetails = {
      address: '',
      lat: '',
      lng: '',
      components: {
        route: { set: false, short: '', long: '' },                           // calle 
        street_number: { set: false, short: '', long: '' },                   // numero
        sublocality_level_1: { set: false, short: '', long: '' },             // barrio
        locality: { set: false, short: '', long: '' },                        // localidad, ciudad
        administrative_area_level_2: { set: false, short: '', long: '' },     // zona/comuna/partido 
        administrative_area_level_1: { set: false, short: '', long: '' },     // estado/provincia 
        country: { set: false, short: '', long: '' },                         // pais
        postal_code: { set: false, short: '', long: '' },                     // codigo postal
        postal_code_suffix: { set: false, short: '', long: '' },              // codigo postal - sufijo
      }
    };
  }
  
  showModal() {
    this.reset();
    // show modal|
    console.log('va a invocar el modal');
    let modal = this.modalCtrl.create(AutoCompletadoPage);
    modal.onDidDismiss(data => {
      console.log('page > modal dismissed > data > ', data);
      if (data) {
        console.log('Dentro del modal');
        console.log(data);
        this.address.place = data.description;
        // get details
        this.getPlaceDetail(data.place_id);
      }
    });
    modal.present();
  }
  
  private reset() {
    this.initPlacedetails();
    this.address.place = '';
    this.address.set = false;
  }
 
  private getPlaceDetail(place_id: string): void {
    var self = this;
    var request = {
      placeId: place_id
    };
   
    this.placesService = new google.maps.places.PlacesService(this.mapa);
    this.placesService.getDetails(request, callback);
    function callback(place, status) {
      console.log('--getplacedetail');
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log('--page > getPlaceDetail > place > ', place);
        // set full address
        self.placedetails.address = place.formatted_address;
        self.placedetails.lat = place.geometry.location.lat();
        self.placedetails.lng = place.geometry.location.lng();

        for (var i = 0; i < place.address_components.length; i++) {
          let addressType = place.address_components[i].types[0];
          let values = {
            short_name: place.address_components[i]['short_name'],
            long_name: place.address_components[i]['long_name']
          }
          if (self.placedetails.components[addressType]) {
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
        console.log('--latitud y longitud');
        console.log(self);
        console.log(self.ubicacion.lat);
        console.log(self.ubicacion.lng);
        self.userService.GetTalleres(self.cita.idUnidad, self.ubicacion.lat, self.ubicacion.lng)
 
          .subscribe(
          (data) => { // Success
            if (data && data != null && data.length > 0) {
              console.log('--carga inicial de los talleres');
              console.log(data);
              self.talleres = data;
            }
          },
          (error) => {
            console.log(error);
          }
          );
        // populate
        self.address.set = true;
        console.log('page > getPlaceDetail > details > ', self.placedetails);
            }else{
                console.log('page > getPlaceDetail > status > ', status);
      }
    }
  }
 
  ionViewDidLoad() {

  }

  private createMapMarker(place: any): void {

    var placeLoc = place.geometry.location;

    if (this.markers && this.markers.length > 0) {
      this.markers[0].setMap(null);
      var marker = new google.maps.Marker({
        map: this.mapa,
        position: placeLoc
      });
      this.markers.push(marker);
      this.markers.forEach((value, idx) => {
        this.markers.splice(idx, 1);
      });
    } else {
      var marker = new google.maps.Marker({
        map: this.mapa,
        position: placeLoc
      });
      this.markers.push(marker);
    }
  }
  
  public showTallerDetalle(taller) {
    this.navCtrl.push(CalendarioPage, {
      cita: {
        idServicio: this.cita.idServicio,
        idUsuario: this.cita.idUsuario,
        idContratoOperacion: this.cita.idContratoOperacion,
        idUnidad: this.cita.idUnidad,

        Servicio: this.cita.Servicio,
        nombre: this.cita.nombre,
        modelo: this.cita.modelo,
        nombreMarca: this.cita.nombreMarca,
 
        direccion: taller.direccion,
        idTaller: taller.idTaller,
        nombreComercial: taller.nombreComercial
      }
    });
  }
 
  public llamarCallCenter() {
    this.callNumber.callNumber('5575839991', true)
      .then(() => console.log('Esta llamando a call center'))
      .catch(() => console.log('fallo la llamada'));
  }

  salir() {
    this.navCtrl.setRoot(LoginPage);
  };
}