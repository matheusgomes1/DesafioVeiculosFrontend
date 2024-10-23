import { TipoVeiculo } from "../enums/tipo-veiculo.enum";
import { Revisao } from "./revisao.model";

export class Veiculo {
    id?: number;
    placa: string;
    ano: string;
    cor: string;
    modelo: string;
    tipoVeiculo: TipoVeiculo;
    capacidadeCarga?: number;
    capacidadePassageiro?: number;
    revisoes: Revisao[];
}