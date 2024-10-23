export enum TipoVeiculo {
  Carro = 1,
  Caminhao = 2,
}

export const tipoToStringMap = new Map<TipoVeiculo, string>([
  [TipoVeiculo.Carro, 'Carro'],
  [TipoVeiculo.Caminhao, 'Caminhão']
])