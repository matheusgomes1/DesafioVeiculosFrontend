import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export interface CustomDialogData {
  message: string;
  title: string;
  labelRefuse: string;
  labelConfirm: string;
}

@Component({
  selector: 'app-confirm-dialog-custom',
  standalone: true,
  imports: [
    MatDialogTitle, 
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule, 
    MatIconButton, 
    MatButton,
    CommonModule
  ],
  templateUrl: './confirm-dialog-custom.component.html',
  styleUrl: './confirm-dialog-custom.component.scss'
})
export class ConfirmDialogCustomComponent {
  data = inject<CustomDialogData>(MAT_DIALOG_DATA);
}
