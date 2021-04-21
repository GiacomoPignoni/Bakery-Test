import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ErrorBarComponent } from './error-bar/error-bar.component';

const COMPONENTS = [
  NavbarComponent,
  ErrorBarComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class ComponentsModule { }
