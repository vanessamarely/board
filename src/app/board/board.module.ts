import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BoardRoutingModule } from './board-routing.module';
import { SharedModule } from './../shared/shared.module';

import { BoardComponent } from './board/board.component';
import { ListComponent } from './list/list.component';
import { CardComponent } from './card/card.component';
import { MaterialCdkModule } from './../material-cdk/material-cdk.module';
import { FormTaskComponent } from './form-task/form-task.component';

@NgModule({
  declarations: [BoardComponent, ListComponent, CardComponent, FormTaskComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BoardRoutingModule,
    SharedModule, 
    MaterialCdkModule
  ]
})
export class BoardModule { }
