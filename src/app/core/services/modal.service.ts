
import { ComponentRef, Injectable, Injector  } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public dialogRef: any;

  constructor() { }

}
