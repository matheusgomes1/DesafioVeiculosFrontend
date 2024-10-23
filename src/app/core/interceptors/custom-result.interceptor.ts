import { HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { map, Observable, tap } from "rxjs";

export function customResultInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const body = event.body;
        
        if (body && body.hasOwnProperty('success') && body.hasOwnProperty('data')) {
          return event.clone({ body: body.data });
        }
      }
      return event;
    })
  )
}