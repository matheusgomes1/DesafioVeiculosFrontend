import { Injectable } from "@angular/core";
import { VeiculoFiltro } from "../models/veiculo-filtro.model";

@Injectable()
export class VeiculoFiltroService {
  public filtro: VeiculoFiltro;

  constructor() { }

  setFiltro(
    pagina: number, 
    tamanhoPagina: number, 
    ordenadoPor: string | undefined = 'Id', 
    decrescente: boolean = false,
    texto: string = '') {
      if (!this.filtro)
        this.filtro = {};

      this.filtro.pagina = pagina;
      this.filtro.tamanhoPagina = tamanhoPagina;
      this.filtro.orderBy = ordenadoPor;
      this.filtro.desc = decrescente;
      this.filtro.texto = texto;
  }

  setPagina(pagina: number, tamanhoPagina: number) {
    this.filtro.pagina = pagina;
    this.filtro.tamanhoPagina = tamanhoPagina;
  }

  setOrdenacao(ordenadoPor: string, decrescente: boolean) {
    if (!this.filtro)
      this.filtro = {pagina: 1, tamanhoPagina: 5, orderBy: 'Id', desc: false};

    this.filtro.orderBy = ordenadoPor;
    this.filtro.desc = decrescente;
  }

  setTexto(texto: string) {
    if(!this.filtro) return;

    this.filtro.texto = texto;
  }

  get(): VeiculoFiltro {
    return this.filtro;
  }
}