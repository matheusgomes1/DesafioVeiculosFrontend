import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { VeiculoFiltroService as VeiculoFiltroService } from '../services/veiculo-filtro.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { VeiculoFiltro } from '../models/veiculo-filtro.model';

@Component({
  selector: 'app-filtro-veiculo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './filtro-veiculo.component.html',
  styleUrl: './filtro-veiculo.component.scss'
})
export class FiltroVeiculoComponent implements OnInit {
  @Output() filtrarEvt: EventEmitter<VeiculoFiltro> = new EventEmitter<VeiculoFiltro>();
  form: FormGroup;

  constructor(private filtroService: VeiculoFiltroService) {
  }

  async ngOnInit() {
    this.form = new FormGroup({
      texto: new FormControl<string>('')
    });
  }

  filtrar() {
    this.filtroService.setTexto(this.form.controls['texto'].value ?? '');
    this.filtrarEvt.emit(this.filtroService.get());
  }

  limpar() {
    this.form.reset();
    this.filtroService.setTexto(this.form.controls['texto'].value ?? '');
    this.filtroService.setPagina(1, 5);
    this.filtrarEvt.emit(this.filtroService.get());
  }
}
