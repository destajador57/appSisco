import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashRoutingModule } from './dash-routing.module';
import { DashComponent }     from './dash.component';
import { DashService }       from './dash.service';
import { FormsModule }              from '@angular/forms';
import { NgbModule }                from '@ng-bootstrap/ng-bootstrap';
import { SharedPipesModule, 
         SortableTableModule }      from '../../shared';
import { DataTablesModule } from 'angular-datatables';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    DashRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    SharedPipesModule,
    SortableTableModule,
    DataTablesModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [
    DashComponent
  ],
  providers: [
    DashService
  ]
})
export class DashModule { }
