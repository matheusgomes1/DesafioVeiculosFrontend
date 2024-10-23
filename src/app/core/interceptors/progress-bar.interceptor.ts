import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { LoadingControllerService } from "../services/loading-controller.service";

export function progressBarInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const loadingController = inject(LoadingControllerService);
  loadingController.addLoader();
  return next(req).pipe(finalize(() => {
    loadingController.removeLoader();
  }));
}