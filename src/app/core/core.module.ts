import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services';
import { ModalService } from './services';
import { TasksService } from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [ ApiService, ModalService, TasksService ]
})
export class CoreModule { }
