import { AfterViewInit, Component, ElementRef, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import {  DomPortal, TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('templatePortalContent') templatePortalContent: TemplateRef<unknown>;
  @ViewChild('domPortalContent') domPortalContent: ElementRef<HTMLElement>;
  
  domPortal: DomPortal<any>;
  templatePortal: TemplatePortal<any>;

  constructor(private _viewContainerRef: ViewContainerRef) { }

  ngAfterViewInit(): void {
    this.templatePortal = new TemplatePortal(
      this.templatePortalContent,
      this._viewContainerRef
    );
    //this.domPortal = new DomPortal(this.domPortalContent);
  }

}
