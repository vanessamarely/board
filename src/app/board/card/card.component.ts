import { Component, Input, OnInit } from '@angular/core';
import { CardSchema, ListSchema } from "./../../core/models";
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { TasksService } from './../../core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: CardSchema;
  @Input() list?: ListSchema;
  
  isOverlayDisplayed = false;
  readonly overlayOptions: Partial<CdkConnectedOverlay> = {
    hasBackdrop: true,
    positions: [
      { originX: 'start', originY: 'top', overlayX: 'start',  overlayY: 'top'}
    ]
  };

  constructor(public tasksService: TasksService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  removeTask(cardSelected: CardSchema): void {
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.tasksService.removeTask(cardSelected, this.list);
    });
  }

  displayOverlay(): void {
    this.isOverlayDisplayed = true;
  }

  hideOverlay(): void {
    this.isOverlayDisplayed = false;
  }

}
