import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDrawer } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoadingControllerService } from '../../services/loading-controller.service';
import { CommonModule } from '@angular/common';
import { TopbarService } from '../../services/topbar.service';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule, 
    MatIconModule, 
    MatProgressBarModule,
    CommonModule,
    MatChipsModule,
    RouterModule,
    MatMenuModule
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  envName = environment.production ? '' : `(${environment.environment})`;

  constructor(public loadingController: LoadingControllerService,
    public topbarService: TopbarService,
  ) {    
  }
}
