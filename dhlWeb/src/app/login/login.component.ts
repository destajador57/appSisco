import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { LoginService } from './login.service';
import { IAuth } from './auth';
import { DhlServiceService } from '../dhl-service.service';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  errorMessage: any;
  authUsuario: IAuth[];
  mensajeUsuario: string;
  signupForm: FormGroup;
  usuario: FormControl;
  password: FormControl;
  user: { usuario: string, contrasena: string };
  error: boolean;

  constructor(private _service: LoginService, public router: Router, private dhlService: DhlServiceService) {
    this.user = {
      usuario: '',
      contrasena: ''
    };
    this.error = false;
  }

  responseLogin: IAuth[] = [];

  ngOnInit() {
    // this.createFormControls();
    // this.createForm();
    // this.onChanges();
  }

  //Borra mensaje de usuario cuando se edita el formulario
  // onChanges(): void {
  //   this.signupForm.valueChanges.subscribe(val => {
  //     this.mensajeUsuario = '';
  //   });
  // }

  // //Cacha el submit del formulario y llama el sp de login
  onSubmit() {
    console.log('dentro del metodo enviar');
    console.log(this.user);
    //const usuario = {Usuario: 'userweb', Password: 123};
    this.dhlService.login(this.user).subscribe((res: any) => {
      console.log(res);
      if (res && res.ok > 0) {
        localStorage.setItem('isLoggedin', 'true');
        this.router.navigate(['/dash']);
        //this.router.navigateByUrl('dash');
        console.log("aqui")
      } else {
        this.error = true;
        console.log("error")
      }
    });
    // if (this.signupForm.valid) {
    //   this.mensajeUsuario = '';
    //   this.getAuth();
    // }
    // if(this.usuario.value == "" && this.password.value == ""){
    //   swal({
    //     type: 'error',
    //     title: 'Alto',
    //     text: 'Favor de ingresar los datos necesarios.'
    //   })
    // }
  }

  // //Cuando todo OK, guarda la variable local que usa AuthGuard
  // onLoggedIn() {
  //   localStorage.setItem('isLoggedin', 'true');
  //   //localStorage.setItem("UserData", JSON.stringify(this.authUsuario[0]));
  //   this.router.navigateByUrl('dash');
  // }

  // getAuth(): void {

  //   this._service.getAuth({
  //     usuario: this.usuario.value,
  //     password: this.password.value })
  //       .subscribe( responseLogin => {
  //           this.responseLogin = responseLogin;
  //           if( this.responseLogin[0].ok == 0 ){
  //             swal({
  //               type: 'error',
  //               title: 'Alto',
  //               text: 'Usuario y/o Contraseña incorrecta.'
  //             });
  //           }else{
  //             this.onLoggedIn();
  //           }
  //           console.log( "ResponseLogin", this.responseLogin[0].ok );
  //       },
  //       error => this.errorMessage = <any>error );
  // }

  createFormControls() {
    this.usuario = new FormControl('', [
      Validators.required,
      Validators.maxLength(100)
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.maxLength(20)
    ]);
  }

  createForm() {
    this.signupForm = new FormGroup({
      usuario: this.usuario,
      password: this.password,
    });
  }
}
