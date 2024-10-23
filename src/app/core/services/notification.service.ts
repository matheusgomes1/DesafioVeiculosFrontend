import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackBarComponent } from '../components/custom-snack-bar/custom-snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {}

  /**
   * Exibe uma notificação com título e mensagem.
   * @param title - O título da notificação.
   * @param message - A mensagem da notificação.
   * @param panelClass - Classe CSS para personalizar a cor (ex: 'error-snackbar', 'warning-snackbar', 'info-snackbar', 'success-snackbar').
   * @param duration - Duração em milissegundos (opcional).
   */
  showNotification(title: string, message: string, panelClass: string = '', duration: number = 5000): void {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {
      data: { title, message },
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [panelClass],
    });
  }

  showError(title: string, message: string, duration: number = 5000) {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {
      data: { title, message, icon: 'error' },
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }

  showInfo(title: string, message: string, duration: number = 5000) {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {
      data: { title, message, icon: 'info' },
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['info-snackbar'],
    });
  }

  showWarning(title: string, message: string, duration: number = 5000) {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {
      data: { title, message, icon: 'warning' },
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['warning-snackbar'],
    });
  }

  showSuccess(title: string, message: string, duration: number = 5000) {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {
      data: { title, message, icon: 'done_outline' },
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }
}