import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashComponent } from './dash.component';
const routes: Routes = [
  {
      path: '',
      component: DashComponent

    }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashRoutingModule { }
