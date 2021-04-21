import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { DessertBoxComponent } from './dessert-box/dessert-box.component';

const ROUTES: Routes = [
  {
    path: "", component: HomeComponent
  }
]

@NgModule({
  declarations: [
    HomeComponent,
    DessertBoxComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class HomeModule { }
