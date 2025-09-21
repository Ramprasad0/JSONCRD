import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentsComponent } from './components/add-students/add-students.component';
import { ViewStudentsComponent } from './components/view-students/view-students.component';
import { ViewByIdComponent } from './components/view-by-id/view-by-id.component';
import { UpdateComponent } from './components/update/update.component';

const routes: Routes = [
  {path:'add',component:AddStudentsComponent},
  {path:'view',component:ViewStudentsComponent},
  {path:'view/:id',component:ViewByIdComponent},
  {path:'update/:id',component:UpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
