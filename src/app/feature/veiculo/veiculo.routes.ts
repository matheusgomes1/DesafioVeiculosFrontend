import { Routes } from "@angular/router";

export const veiculoRoutes: Routes = [
  {
    path: "",
    loadComponent: () => import('./listagem-veiculo/listagem-veiculo.component')
      .then(mod => mod.ListagemVeiculoComponent),
  }
];