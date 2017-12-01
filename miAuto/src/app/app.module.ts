import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { OptionPage} from '../pages/option/option';
import { MantenimientoPage } from '../pages/mantenimiento/mantenimiento';
import { ServicioPage } from '../pages/servicio/servicio';
import { BuscarTallerPage } from '../pages/buscar-taller/buscar-taller';
import { AutoCompletadoPage } from '../pages/auto-completado/auto-completado';
import { AccidenteRoboPage } from '../pages/accidente-robo/accidente-robo';
import { ControlDocumentalPage } from '../pages/control-documental/control-documental';
import { DocumentoPage } from '../pages/documento/documento';
import { RegistroPage } from '../pages/registro/registro';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CallNumber } from '@ionic-native/call-number';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { UserServiceProvider } from '../providers/user-service/user-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    OptionPage,
    MantenimientoPage,
    ServicioPage,
    BuscarTallerPage,
    AutoCompletadoPage,
    AccidenteRoboPage,
    ControlDocumentalPage,
    DocumentoPage,
    RegistroPage
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
    AmChartsModule,
    PdfViewerModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    OptionPage,
    MantenimientoPage,
    ServicioPage,
    BuscarTallerPage,
    AutoCompletadoPage,
    AccidenteRoboPage,
    ControlDocumentalPage,
    DocumentoPage,
    RegistroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    GoogleMaps,
    Geolocation,
    UserServiceProvider,
    File,
    FileTransfer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
