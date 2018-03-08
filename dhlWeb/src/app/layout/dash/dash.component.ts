import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { trigger, style, transition, animate, keyframes, query, stagger, group, state, animateChild } from '@angular/animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DhlServiceService } from '../../dhl-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  NgForm,
} from '@angular/forms';

import { DashService } from './dash.service';
import { IAutoTb } from "./AutoTb";
import { IServerResponse } from "./ServerResponse";
// import { IEmpresas } from "./empresas";
// import { ITipoPromocion } from "./tipo-promocion";
// import { IMarca } from "./marca";
// import { ISucursal } from "./sucursal";
import { stringify } from 'querystring';
import { IPromise } from 'protractor/node_modules/@types/q';
import { IComentarioById } from "./comentarioByid";
import { ICotizacionById } from "./cotizacionByid";
// import { Iimage } from "./Img";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import swal from "sweetalert2";


@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  // //ruta
  // public serverPath: any = "http://192.168.20.92:3420/promociones/";

  //Variables para el formulario de guardar una nueva promocion
  form: FormGroup;
  // SelectTipoPromocion = new FormControl("", Validators.required);
  // SelectEmpresa = new FormControl("", Validators.required);
  // SelectSucursal = new FormControl("", Validators.required);
  // SelectMarca = new FormControl("", Validators.required);
  // TxtDescripcion = new FormControl("", Validators.required);
  // imageInput = new FormControl("");
  // idUsuario = new FormControl("");
  // RealImg = new FormControl("");
  // typeImg = new FormControl("");
  // typeImgUp = new FormControl("");
  txt_idUnidad = new FormControl("", Validators.required);

  //Variables para el formualario de actualizar imagen
  formUpdate: FormGroup;

  //Variables a utilizar en la clase
  errorMessage: any;

  // //ModalImagenVariables
  // ModalDesc: string = "";
  // ModalImg: string = "";
  // ModalIdPromo: number = 0;

  // selectedEmpresa: number = 0;
  // selectedTPromocion: number = 0;
  // selectedMarca: number = 0;
  // selectedSucursal: number = 0;
  // descripcion: string = "";

  // closeResult: string;
  // idPromocion: number = 0;
  // public data: object;
  idUnidad: number = 0;
  vin: number = 0;
  UnidadID: number = 0;
  UsuarioID = localStorage.getItem("user");
  comentar : string ="";
  partida : string ="Hola";
  precio : string ="";
  cantidad : string ="";

  unidades: Array<any>;
  comentarios: Array<any>;
  cotizaciones: Array<any>;
  evidencias: Array<any>;

  public temp_var: Object = false;
  temp_comentario = false;
  temp_cotizacion = false;


  constructor(private _Dashservice: DashService,
    private modalService: NgbModal,
    public fb: FormBuilder,
    private dhlService: DhlServiceService,
    private domSanitizer: DomSanitizer,
    private _http: HttpClient) {
    console.log('constructor');
    this.form = fb.group({
      // "SelectTipoPromocion": this.SelectTipoPromocion,
      // "SelectEmpresa": this.SelectEmpresa,
      // "SelectSucursal": this.SelectSucursal,
      // "SelectMarca": this.SelectMarca,
      // "TxtDescripcion": this.TxtDescripcion,
      // "imageInput": this.imageInput,
      // "idUsuario": this.idUsuario,
      // "RealImg": this.RealImg,
      // "typeImg": this.typeImg,
      "txt_idUnidad": this.txt_idUnidad,

    });

    this.formUpdate = fb.group({
      // "RealImgUpdate": this.RealImgUpdate,
      // "imageInputUpdate": this.imageInputUpdate,
      // "promoIdUp": this.promoIdUp,
      // "typeImgUp": this.typeImgUp,
    });
    console.log('fin constructor');


    this.unidades = [];
    this.comentarios = [];
    this.cotizaciones = [];
    this.evidencias = [];
  }

  resultadoDash: IAutoTb[] = [];
  resultadoComentariosById: IComentarioById[] = [];
  resultadoCotizacionesById: ICotizacionById[] = [];
  // serverResponse:             IServerResponse[] = [];
  // resultadoEmpresas:          IEmpresas[] = [];
  // resultadoTPromocion:        ITipoPromocion[] = [];
  // resultadoMarca:             IMarca[] = [];
  // resultadoSucursal:          ISucursal[] = [];

  ngOnInit() {
    this.getTablaDash();
    // this.getEmpresas();
    // this.getTipoPromocion();
  }

  getTablaDash(): void {

    console.log('dentro del metodo Consulta Unidades');

    //const usuario = {Usuario: 'userweb', Password: 123};
    this.dhlService.GetUnidades().subscribe((res: Array<any>) => {
      console.log(res);
      this.unidades = res;
      this.temp_var = true;
    });
    // this.dhlService.GetUnidades()
    //   .subscribe((resultadosUnidades: any) => {
    //   console.log("",localStorage.getItem("isLoggedin"));
    //   // if (res && res.ok > 0) {
    //   //   localStorage.setItem('isLoggedin', 'true');
    //   //   this.router.navigate(['/dash']);
    //   //   //this.router.navigateByUrl('dash');
    //   //   console.log("aqui")
    //   // } else {
    //     // this.error = true;
    //      console.log("error")
    //   // }
    // });

    // this._Dashservice.getDashColumn()
    //   .subscribe(resultadoDash => {
    //     // var pathServer = this.serverPath;
    //     this.temp_var = true;
    //     this.resultadoDash = resultadoDash;
    //     // console.log("pathserver", pathServer);
    //     // this.resultadoPromociones.forEach(function (item, key) {
    //     //   item.pathImagen = pathServer + item.po_RutaImagen;
    //     //item.pathImagen = 'file/promociones/' + item.po_RutaImagen;
    //     // });
    //     console.log("Resultado", this.resultadoDash);
    //   },
    //     error => this.errorMessage = <any>error);
  }

  insertComentario(idUnidad, comentario) {
    swal({
      title: '¿Desea Ingresar el Comentario?' + idUnidad + " " + comentario + " " + this.UsuarioID,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {

        this.dhlService.InsertComentario(idUnidad, comentario, this.UsuarioID).subscribe((res: any) => {
          console.log(res);
          if (res && res.ok > 0) {
            
            //Llena Tabla Comentario 
            this.dhlService.GetComentariosByUnidad(idUnidad).subscribe((res: Array<any>) => {
              this.comentarios = res;
            });
            this.comentar = "";
            console.log("Agrego Comentario");
            
            swal(
              'Guardado',
              'Comentario Guardado con Exito.',
              'success'
            );
          } else {

            console.log('error en el login');
            this.comentar = "";
          }
        });

      } else if (result.dismiss === 'cancel') {
        swal(
          'Cancelado',
          'No se Ingreso Comentario.',
          'error'
        )
      }
    });
  }

  insertCotizacion(idUnidad, partida,cantidad,precio) {
    swal({
      title: '¿Desea Ingresar la Partida?' + idUnidad + " " + partida + " " + this.UsuarioID,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {

        this.dhlService.InsertCotizacion(idUnidad, partida,cantidad,precio, this.UsuarioID).subscribe((res: any) => {
          console.log(res);
          if (res && res.ok > 0) {
            
            //Llena Tabla Partidas 
            this.dhlService.GetCotizacionByUnidad(idUnidad).subscribe((res: Array<any>) => {
              
              this.cotizaciones = res;
            });
            this.partida = "";
            this.precio = "";
            this.cantidad = "";
            console.log("Agrego Partida");
            
            swal(
              'Guardado',
              'Partida Guardada con Exito.',
              'success'
            );
          } else {

            console.log('error en el login');
            this.partida = "";
            this.precio = "";
            this.cantidad = "";
          }
        });

      } else if (result.dismiss === 'cancel') {
        swal(
          'Cancelado',
          'No se Ingreso La Partida.',
          'error'
        )
      }
    });
  }

  // saveDash() {
  //   swal({
  //     title: '¿Guardar El Comentario?',
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Guardar',
  //     cancelButtonText: 'Cancelar',
  //     confirmButtonClass: 'btn btn-success',
  //     cancelButtonClass: 'btn btn-danger',
  //     buttonsStyling: false,
  //   }).then((result) => {
  //     if (result.value) {
  //       this._Dashservice.saveComentarios(this.form)
  //         .subscribe(serverResponse => {
  //           swal(
  //             'Guardado',
  //             'Se guardo la promción con éxito.',
  //             'success'
  //           );
  //           // this.serverResponse = serverResponse;
  //           // this.getTablaPromociones();
  //         },
  //           error => this.errorMessage = <any>error);
  //     } else if (result.dismiss === 'cancel') {
  //       swal(
  //         'Canelado',
  //         'No se guardo la promoción',
  //         'error'
  //       );
  //     }
  //   });
  // }

  //================================================================= M O D A L E S =================================================//

  //========= MODAL INSERT ========//
  open(content, idUnidad, vin) {
    this.modalService.open(content, { size: "lg" });

    this.dhlService.GetComentariosByUnidad(idUnidad).subscribe((res: Array<any>) => {
      
      this.comentarios = res;
      this.temp_comentario = true;
      this.UnidadID = idUnidad;
      // localStorage.getItem("user");

      console.log("IDUnidad Modal", idUnidad);
      console.log(this.comentarios);
    });
  }


  openEvidencias(evidencia, idUnidad) {
    this.modalService.open(evidencia, { size: 'lg' });

    this.dhlService.GetEvidenciasByUnidad(idUnidad).subscribe((res: Array<any>) => {
      this.evidencias = res;
      console.log(idUnidad);
      console.log(this.evidencias);
    });
  }

  openCot(cotizacion, idUnidad) {
    this.modalService.open(cotizacion, { size: 'lg' });

    this.dhlService.GetCotizacionByUnidad(idUnidad).subscribe((res: Array<any>) => {
      this.cotizaciones = res;
      this.UnidadID = idUnidad;
      console.log(idUnidad);
      console.log(this.cotizaciones);
    });
  }

    // this.getTablaPromociones();


  //// Llena Grid de Comentarios By ID
  //   this._Dashservice.GetPromocion_ById({ idUnidad: idUnidad })

  //     .subscribe(resultadoComentariosById => {
  //       this.resultadoComentariosById = resultadoComentariosById;
  //       this.idUnidad = idUnidad;
  //       this.vin = vin;
  //       // this.onChangeEmpresa( this.resultadoPromocionesById[0].po_idEmpresa );
  //       // this.selectedTPromocion     = this.resultadoPromocionesById[0].po_IdTipoPromocion;
  //       // this.selectedEmpresa        = this.resultadoPromocionesById[0].po_idEmpresa;
  //       // this.selectedMarca          = this.resultadoPromocionesById[0].po_IdMarca;
  //       // this.selectedSucursal       = this.resultadoPromocionesById[0].po_IdSucursal;
  //       // this.descripcion            = this.resultadoPromocionesById[0].po_Descripcion;
  //       // this.ModalImg               = img;
  //       // this.idPromocion            = this.resultadoPromocionesById[0].po_IdPromocion;
  //       // console.log(this.idUnidad);
  //       // console.log(this.vin);
  //       console.log("idUnidad",idUnidad);
  //       console.log("Vin",vin);
  //       this.temp_var = true;
  //     },
  //       error => this.errorMessage = <any>error);
  // }

}
