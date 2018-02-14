import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-promocion',
  templateUrl: 'promocion.html',
})
export class PromocionPage {

  promociones: {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromocionPage');

    this.userService.GetPromocion('a', 123).subscribe((res)=>{
      this.promociones = res;
    });
  }
}
