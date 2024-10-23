import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ListResponse } from '../../../core/models/list-response.model';
import { VeiculoResumido } from '../models/veiculo-resumido.model';
import { HttpClient } from '@angular/common/http';
import { VeiculoFiltro } from '../models/veiculo-filtro.model';
import { Veiculo } from '../models/veiculo.model';

@Injectable()
export class VeiculoService {
  private ENDPOINT = 'veiculo';
  private API_URL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public get(filtro: VeiculoFiltro): Observable<ListResponse<VeiculoResumido>> {
    return this.httpClient.get<ListResponse<VeiculoResumido>>(
      `${this.API_URL}${this.ENDPOINT}?
page=${filtro.pagina}&
pageSize=${filtro.tamanhoPagina}&
texto=${filtro.texto}&
orderBy=${filtro.orderBy}&
desc=${filtro.desc ? 'true' : 'false'}`);
  }

  public getById(id: number): Observable<Veiculo> {
    return this.httpClient.get<Veiculo>(`${this.API_URL}${this.ENDPOINT}/ObterPorId/${id}`);
  }

  public post(veiculo: Veiculo): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.API_URL}${this.ENDPOINT}`, veiculo);
  }

  public put(veiculo: Veiculo): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.API_URL}${this.ENDPOINT}`, veiculo);
  }

  public delete(id: number) {
    return this.httpClient.delete<boolean>(`${this.API_URL}${this.ENDPOINT}/${id}`);
  }
}
