import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { VeiculoResumido } from '../models/veiculo-resumido.model';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TopbarService } from '../../../core/services/topbar.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { VeiculoService } from '../services/veiculo.service';
import { MatMenuModule } from '@angular/material/menu';
import { NotificationService } from '../../../core/services/notification.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogCustomComponent, CustomDialogData } from '../../../core/components/confirm-dialog-custom/confirm-dialog-custom.component';
import { MatSortModule, Sort, SortDirection } from '@angular/material/sort';
import { VeiculoFiltroService } from '../services/veiculo-filtro.service';
import { FiltroVeiculoComponent } from '../filtro-veiculo/filtro-veiculo.component';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { tipoToStringMap } from '../enums/tipo-veiculo.enum';
import { CadastroVeiculoComponent } from '../cadastro-veiculo/cadastro-veiculo.component';

@Component({
  selector: 'app-listagem-veiculo',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatExpansionModule,
    FiltroVeiculoComponent
  ],
  providers: [VeiculoService, VeiculoFiltroService],
  templateUrl: './listagem-veiculo.component.html',
  styleUrl: './listagem-veiculo.component.scss'
})
export class ListagemVeiculoComponent implements OnInit {
  veiculos: VeiculoResumido[];
  displayedColumns: string[] = ['acoes', 'Placa', 'Modelo', 'Ano', 'Cor'];
  pageSizeOptions = [5, 10, 25];
  itemsCount: number = 0;
  situacaoToStringMap = tipoToStringMap;

  @ViewChild('expansionPanel') expasionPanel: MatExpansionPanel;

  constructor(
    private produtoService: VeiculoService,
    private topbarService: TopbarService,
    private notificationService: NotificationService,
    public filtroService: VeiculoFiltroService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.topbarService.setBackRoute(null);
    this.topbarService.breadcrumbs.set([{label: 'Gerenciar Veículos', route: ''}]);

    this.filtroService.setFiltro(1, 5);
    this.consultarFiltrado();
  }

  cadastrar() {
    const dialogRef = this.dialog.open(CadastroVeiculoComponent, {
      data: {
        id: 0
      },
      panelClass: 'full-screen-dialog'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.consultarFiltrado();
    });
  }

  alterarPagina(pageEvent: PageEvent) {
    this.filtroService.setPagina(pageEvent.pageIndex + 1, pageEvent.pageSize);
    this.consultarFiltrado();
  }

  editar(veiculo: VeiculoResumido) {
    const dialogRef = this.dialog.open(CadastroVeiculoComponent, {
      data: {
        id: veiculo.id
      },
      panelClass: 'full-screen-dialog'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.consultarFiltrado();
    });
  }

  deletar(veiculo: VeiculoResumido) {
    const dialogRef = this.dialog.open(ConfirmDialogCustomComponent, {
      data: {
        labelRefuse: 'Não',
        labelConfirm: 'Sim',
        message: `Tem certeza que deseja excluir o veículo ${veiculo.id}`,
        title: 'Confirmação'
      }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if(confirm) {
        this.produtoService.delete(veiculo.id ?? 0).subscribe((result) => {
          this.notificationService.showSuccess('Excluído com sucesso.', '');

          this.consultarFiltrado();
        });
      }
    });
  }

  ordenarPor(sortEvent: Sort) {
    this.filtroService.setOrdenacao(
      (sortEvent.direction == '') ? 'Id' : sortEvent.active,
      (sortEvent.direction == 'desc') ? true : false);

    this.consultarFiltrado();
  }

  consultarFiltrado() {
    this.produtoService.get(this.filtroService.get()).subscribe((resp) => {
      this.veiculos = resp.items;
      this.itemsCount = resp.totalItems;
      this.expasionPanel.close();
    });
  }
}
