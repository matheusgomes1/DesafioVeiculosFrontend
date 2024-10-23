import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable, tap } from "rxjs";
import { NotificationService } from "../services/notification.service";

export function errorResponseInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const notification = inject(NotificationService);

  return next(req).pipe(
    catchError((errorResp: HttpErrorResponse, caught: Observable<HttpEvent<unknown>>) => {
      if (errorResp.status == HttpStatusCode.Unauthorized)
        notification.showError('Sem Autorização!', 'Por favor faça o login com o perfil ou permissão necessária.');
      if (errorResp.status == HttpStatusCode.BadRequest)
        notification.showError('Erro de domínio!', (errorResp.error.errors as []).join(',\n ') as string);
      if (errorResp.status == HttpStatusCode.NotFound)
        notification.showError('Recurso não encontrado!', HttpStatusCode.NotFound.toString());
      if (errorResp.status == HttpStatusCode.InternalServerError)
        notification.showError('Erro no serviço!', 'Por favor, entre em contato com o administrador.');

      throw errorResp;
    })
  )
}