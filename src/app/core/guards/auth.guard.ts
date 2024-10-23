import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "../../feature/login/login.service";
import { NotificationService } from "../services/notification.service";

export const authGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
    const loginService = inject(LoginService);
    const notificationService = inject(NotificationService);

    if (loginService.checkIfUserLoggedIn())
      return true;
    
    notificationService.showError('Acesso negado!', 'Por favor, faça o login.');

    return false;
}