import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TopbarService } from './topbar.service';

@Injectable({ providedIn: 'root' })
export class BreadcrumbResolver implements Resolve<string> {

  constructor(private topbarService: TopbarService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    this.topbarService.breadcrumbs.set(route.data['breadcrumbs']);
    return route.data['_breadcrumbs'];
  }
}