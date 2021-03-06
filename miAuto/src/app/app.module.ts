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
import { CalendarioPage } from '../pages/calendario/calendario';
import { ConfirmacionPage } from '../pages/confirmacion/confirmacion';
import { CalificaPage } from '../pages/califica/califica';
import { PromocionPage } from '../pages/promocion/promocion';
import { RecuperaPage } from '../pages/recupera/recupera';

import { StatusBar } from '@ionic-native/status-bar';
import { Deeplinks } from '@ionic-native/deeplinks';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CallNumber } from '@ionic-native/call-number';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { DatePicker } from '@ionic-native/date-picker';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgCalendarModule } from 'ionic2-calendar';

import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { UserServiceProvider } from '../providers/user-service/user-service';
import { Camera } from '@ionic-native/camera';
import { Toast } from '@ionic-native/toast';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AlertaPage } from '../pages/alerta/alerta';

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
    RegistroPage,
    CalendarioPage,
    ConfirmacionPage,
    CalificaPage,
    PromocionPage,
    RecuperaPage,
    AlertaPage
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
    AmChartsModule,
    PdfViewerModule,
    NgCalendarModule,
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
    RegistroPage,
    CalendarioPage,
    ConfirmacionPage,
    CalificaPage,
    PromocionPage,
    RecuperaPage,
    AlertaPage
  ],
  providers: [
    Toast,
    Deeplinks,
    StatusBar,
    SplashScreen,
    CallNumber,
    GoogleMaps,
    Geolocation,
    UserServiceProvider,
    File,
    FileTransfer,
    DatePicker,
    Camera,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
