import { Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';

export interface Breadcrumb {
  label: string;
  route: string;
}

@Injectable({
  providedIn: 'root'
})
export class TopbarService {
  public backRoute: WritableSignal<string | null> = signal(null);
  public breadcrumbs: WritableSignal<Breadcrumb[]> = signal([]); 

  constructor(private router: Router) { }

  public setBackRoute = (route: string | null) => this.backRoute.set(route);

  public backButtonNavigate() {
    this.router.navigate([this.backRoute()])
  }

  public redirecionarRota(rota: string) {
    this.router.navigate([rota]);
  }

  public adicionarRota(breadcrumb: Breadcrumb) {
    const _breadcrumbs = this.breadcrumbs();
    _breadcrumbs.push(breadcrumb);
    this.breadcrumbs.set(_breadcrumbs);
  }

  public removerUltimaRota() {
    const _breadcrumbs = this.breadcrumbs();
    _breadcrumbs.pop();
    this.breadcrumbs.set(_breadcrumbs);
  }
}
