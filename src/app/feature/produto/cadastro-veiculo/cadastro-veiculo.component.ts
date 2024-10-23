import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TopbarService } from '../../../core/services/topbar.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NotificationService } from '../../../core/services/notification.service';
import { VeiculoService } from '../services/veiculo.service';
import { firstValueFrom } from 'rxjs';
import { SingleFileUpload, SingleFileUploadComponent } from '../../../core/components/single-file-upload/single-file-upload.component';
import { SelectOption } from '../../../core/interfaces/select-option.interface';
import { MatSelectModule } from '@angular/material/select';
import { Veiculo } from '../models/veiculo.model';
import { tipoToStringMap, TipoVeiculo } from '../enums/tipo-veiculo.enum';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MatDialogRef } from '@angular/material/dialog';
import { Revisao } from '../models/revisao.model';
import { MatChipsModule } from '@angular/material/chips';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cadastro-veiculo',
  standalone: true,
  providers: [VeiculoService],
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogTitle, 
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatChipsModule,
    DatePipe
  ],
  templateUrl: './cadastro-veiculo.component.html',
  styleUrl: './cadastro-veiculo.component.scss'
})
export class CadastroVeiculoComponent implements OnInit {
  form: FormGroup;
  idVeiculo: number;
  veiculo?: Veiculo;
  arquivoDoProduto: SingleFileUpload;
  tipoToStringMap = tipoToStringMap;
  data = inject<{id: number}>(MAT_DIALOG_DATA);
  showCapacidadePassageiro = false;
  showCapacidadeCarga = false;
  
  tiposVeiculo: SelectOption[] = [
    {
      value: TipoVeiculo.Carro,
      label: tipoToStringMap.get(TipoVeiculo.Carro) ?? ''
    },
    {
      value: TipoVeiculo.Caminhao,
      label: tipoToStringMap.get(TipoVeiculo.Caminhao) ?? ''
    }
  ]

  constructor(private topbarService: TopbarService,
    private notificationService: NotificationService,
    private veiculoService: VeiculoService,
    public dialogRef: MatDialogRef<CadastroVeiculoComponent>
  ) {
  }

  async ngOnInit() {
    this.topbarService.setBackRoute('produto/listagem');
    this.idVeiculo = this.data.id;

    if (this.idVeiculo) {
      this.veiculo = await firstValueFrom(this.veiculoService.getById(this.idVeiculo));
    }

    this.form = new FormGroup({
      placa: new FormControl<string | null | undefined>(this.veiculo?.placa, [Validators.required]),
      ano: new FormControl<string | null | undefined>(this.veiculo?.ano, [Validators.required]),
      cor: new FormControl<string | null | undefined>(this.veiculo?.cor, [Validators.required]),
      modelo: new FormControl<string | null | undefined>(this.veiculo?.modelo, [Validators.required]),
      tipoVeiculo: new FormControl<TipoVeiculo | null | undefined>(this.veiculo?.tipoVeiculo, [Validators.required]),
      capacidadeCarga: new FormControl<number | undefined>(this.veiculo?.capacidadeCarga),
      capacidadePassageiro: new FormControl<number | undefined>(this.veiculo?.capacidadePassageiro),
      km: new FormControl<number | null>(null),
      data: new FormControl<string | null>(''),
      valorRevisao: new FormControl<number | null>(null)
    });

    this.mostrarOcultarCampos();
  }

  adicionarRevisao() {
    if (!this.form.controls['data'].value || !this.form.controls['km'].value || !this.form.controls['valorRevisao'].value) {
      this.notificationService.showInfo('Atenção', 'Preencha os campos km, data e valor da revisão!');
      return;
    }

    if (!this.veiculo)
      this.veiculo = new Veiculo();

    if (!this.veiculo.revisoes)
      this.veiculo.revisoes = [];

    var revisao = new Revisao();
    revisao.data = this.form.controls['data'].value;
    revisao.km = this.form.controls['km'].value;
    revisao.valorDaRevisao = this.form.controls['valorRevisao'].value;

    this.veiculo.revisoes.push(revisao);

    this.form.controls['data'].setValue('');
    this.form.controls['km'].setValue('');
    this.form.controls['valorRevisao'].setValue('');
  }

  removerRevisao(index: number) {
    this.veiculo?.revisoes.splice(index, 1);
  }

  salvar() {
    if (!this.form.valid)
      return;

    if (this.idVeiculo) {
      this.veiculoService.put(this.formControlToProduto()).subscribe((result) => {
        this.notificationService.showSuccess('Produto atualizado!', ''); 
        this.dialogRef.close();
      })
    } else {
      this.veiculoService.post(this.formControlToProduto()).subscribe(
        (result) => { 
          this.notificationService.showSuccess('Produto cadastrado!', ''); 
          this.dialogRef.close();
        }
      );
    }
  }

  formControlToProduto() {
    this.veiculo = this.veiculo ?? new Veiculo();

    this.veiculo.placa = this.form.controls['placa'].value;
    this.veiculo.ano = this.form.controls['ano'].value;
    this.veiculo.modelo = this.form.controls['modelo'].value;
    this.veiculo.cor = this.form.controls['cor'].value;
    this.veiculo.tipoVeiculo = this.form.controls['tipoVeiculo'].value;
    this.veiculo.capacidadePassageiro = this.form.controls['capacidadePassageiro'].value;
    this.veiculo.capacidadeCarga = this.form.controls['capacidadeCarga'].value;
    
    return this.veiculo;
  }

  mostrarOcultarCampos() {
    this.showCapacidadeCarga = false;
    this.showCapacidadePassageiro = false;
    this.form.controls['capacidadeCarga'].clearValidators();
    this.form.controls['capacidadePassageiro'].clearValidators();
    this.form.controls['capacidadeCarga'].updateValueAndValidity();
    this.form.controls['capacidadePassageiro'].updateValueAndValidity();

    if (this.form.controls['tipoVeiculo'].value == TipoVeiculo.Carro) {
      this.showCapacidadePassageiro = true;
      this.form.controls['capacidadePassageiro'].addValidators([Validators.required]);
    } else if (this.form.controls['tipoVeiculo'].value == TipoVeiculo.Caminhao) {
      this.showCapacidadeCarga = true;
      this.form.controls['capacidadeCarga'].addValidators([Validators.required]);
    }
  }
}
