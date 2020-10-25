import { MatDialogRef } from '@angular/material/dialog';

export interface ModalState {
  open: boolean;
  position: ModalPosition;
}

export enum ModalPosition {
  CENTER = 'CENTER',
  RIGHT = 'RIGHT',
}

export enum ModalType {
  HOME = 'HOME',
  SECONDARY_1 = 'SECONDARY_1',
  SECONDARY_2 = 'SECONDARY_2',
}

export interface MatDialogTemplateContext<D = any, R = any> {
  $implicit: D;
  dialogRef: MatDialogRef<this, R>;
}