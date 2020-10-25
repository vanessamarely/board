import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialCdkModule } from "./../material-cdk/material-cdk.module";

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, ModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialCdkModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
})
export class SharedModule { }
