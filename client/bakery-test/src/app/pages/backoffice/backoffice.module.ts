import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackofficeComponent } from './backoffice.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DessertTabComponent } from './dessert-tab/dessert-tab.component';
import { IngredientsTabComponent } from './ingredients-tab/ingredients-tab.component';

const ROUTES: Routes = [
  { path: "", component: BackofficeComponent, children: [
      { path: "", pathMatch: "full", redirectTo: "dessert" },
      { path: "dessert", component: DessertTabComponent },
      { path: "ingredients", component: IngredientsTabComponent }
    ]
  }
];

@NgModule({
  declarations: [
    BackofficeComponent,
    DessertTabComponent,
    IngredientsTabComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule
  ]
})
export class BackofficeModule { }
