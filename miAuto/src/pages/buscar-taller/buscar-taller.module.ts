import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscarTallerPage } from './buscar-taller';

@NgModule({
  declarations: [
    BuscarTallerPage,
  ],
  imports: [
    IonicPageModule.forChild(BuscarTallerPage),
  ],
})
export class BuscarTallerPageModule {}
