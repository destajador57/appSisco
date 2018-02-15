import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-promocion',
  templateUrl: 'promocion.html',
})
export class PromocionPage {
  cita: any;
  promociones: {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider) {
    this.cita = navParams.get('cita');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromocionPage');
    console.log(this.cita);
    this.userService.GetPromocion(this.cita.nombreMarca, this.cita.nombreSubMarca).subscribe((res)=>{
      this.promociones = res;
    });
  }
}
