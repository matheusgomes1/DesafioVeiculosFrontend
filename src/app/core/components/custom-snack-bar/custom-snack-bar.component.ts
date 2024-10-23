import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snack-bar',
  standalone: true,
  imports: [MatIconModule, MatIconButton, CommonModule],
  templateUrl: './custom-snack-bar.component.html',
  styleUrl: './custom-snack-bar.component.scss'
})
export class CustomSnackBarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
              private snackBarRef: MatSnackBarRef<CustomSnackBarComponent>
             ) {}
  
  closeSnackbar(): void {
    this.snackBarRef.dismiss();
  }
}
