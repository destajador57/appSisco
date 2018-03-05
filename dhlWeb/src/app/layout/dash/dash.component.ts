import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { trigger, style, transition, animate, keyframes, query, stagger, group, state, animateChild } from '@angular/animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
  public temp_var: Object = false;


  constructor(private _Dashservice: DashService,
    private modalService: NgbModal,
    public fb: FormBuilder,
    private _http: HttpClient) {
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


  }

  resultadoDash: IAutoTb[] = [];
  resultadoComentariosById: IComentarioById[] = [];
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
    this._Dashservice.getDashColumn()
      .subscribe(resultadoDash => {
        // var pathServer = this.serverPath;
        this.temp_var = true;
        this.resultadoDash = resultadoDash;
        // console.log("pathserver", pathServer);
        // this.resultadoPromociones.forEach(function (item, key) {
        //   item.pathImagen = pathServer + item.po_RutaImagen;
        //item.pathImagen = 'file/promociones/' + item.po_RutaImagen;
        // });
        console.log("Resultado", this.resultadoDash);
      },
        error => this.errorMessage = <any>error);
  }

  saveDash() {
    swal({
      title: '¿Guardar El Comentario?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        this._Dashservice.saveComentarios(this.form)
          .subscribe(serverResponse => {
            swal(
              'Guardado',
              'Se guardo la promción con éxito.',
              'success'
            );
            // this.serverResponse = serverResponse;
            // this.getTablaPromociones();
          },
            error => this.errorMessage = <any>error);
      } else if (result.dismiss === 'cancel') {
        swal(
          'Canelado',
          'No se guardo la promoción',
          'error'
        );
      }
    });
  }

  //================================================================= M O D A L E S =================================================//

  //========= MODAL INSERT ========//
  open(content, idUnidad, vin) {
    this.modalService.open(content, { size: "lg" });
    // this.getTablaPromociones();

    //// Llena Grid de Comentarios By ID
    this._Dashservice.GetPromocion_ById({ idUnidad: idUnidad })

      .subscribe(resultadoComentariosById => {
        this.resultadoComentariosById = resultadoComentariosById;
        this.idUnidad = idUnidad;
        this.vin = vin;
        // this.onChangeEmpresa( this.resultadoPromocionesById[0].po_idEmpresa );
        // this.selectedTPromocion     = this.resultadoPromocionesById[0].po_IdTipoPromocion;
        // this.selectedEmpresa        = this.resultadoPromocionesById[0].po_idEmpresa;
        // this.selectedMarca          = this.resultadoPromocionesById[0].po_IdMarca;
        // this.selectedSucursal       = this.resultadoPromocionesById[0].po_IdSucursal;
        // this.descripcion            = this.resultadoPromocionesById[0].po_Descripcion;
        // this.ModalImg               = img;
        // this.idPromocion            = this.resultadoPromocionesById[0].po_IdPromocion;
        // console.log(this.idUnidad);
        // console.log(this.vin);
        console.log("idUnidad",idUnidad);
        console.log("Vin",vin);
        this.temp_var = true;
      },
        error => this.errorMessage = <any>error);
  }

}
