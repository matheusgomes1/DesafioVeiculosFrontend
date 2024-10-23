import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../../services/notification.service';
import { downloadAs, extractMimeTypeFromBase64 } from '../../utils/base64.utils';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface SingleFileUpload {
  base64: string,
  mimeType: string,
  name: string,
  id?: string
}

export interface UploadFunction {
  (arquivoUpload: SingleFileUpload): Promise<string>;
}

export interface DeleteFunction {
  (arquivoUpload: SingleFileUpload): Promise<string>;
}

export interface DownloadFunction {
  (id: string): void;
}

@Component({
  selector: 'single-file-upload',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './single-file-upload.component.html',
  styleUrl: './single-file-upload.component.scss'
})
export class SingleFileUploadComponent {
  //Ex, MIMETypes para pdf, doc e docx:  application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document
  @Input() mimeTypeAccepted: string;
  @Input() uploadFunction: UploadFunction;
  @Input() deleteFunction: DeleteFunction;
  @Input() downloadFunction: DownloadFunction;
  @Input() fileUploaded: SingleFileUpload | null;
  @Input() maxFileSizeMB: number =  4;

  @Output() base64Uploaded: EventEmitter<string> = new EventEmitter<string>();
  @Output() deletedFile: EventEmitter<string> = new EventEmitter<string>();

  
  loading: boolean = false;
  @ViewChild("fileInput", { static: false }) fileInput!: ElementRef;

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  uploadFile() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (this.validarTamanhoArquivo(selectedFile) === false)
      return;
    const reader = new FileReader();
    this.loading = true;
    console.log(selectedFile);
    reader.onload = async () => {
      const base64String = reader.result as string;

      this.fileUploaded = {
        base64: base64String,
        mimeType: extractMimeTypeFromBase64(base64String) ?? '',
        name: selectedFile.name
      };

      console.log(this.fileUploaded);
      this.base64Uploaded.emit(base64String);

      if (!!this.uploadFunction) {
        this.fileUploaded!.id = await this.uploadFunction({
          base64: base64String,
          mimeType: extractMimeTypeFromBase64(base64String) ?? '',
          name: selectedFile.name
        });
        
        this.loading = false;
      } else {
        this.loading = false;
      }
    };

    reader.onerror = () => {
      this.notificationService.showError("Erro!", "Erro ao carregar o arquivo.");
    };

    reader.readAsDataURL(selectedFile);
  }

  downloadFile() {
    if (!!this.downloadFunction) {
      this.downloadFunction(this.fileUploaded?.id ?? '')
    } else {
      downloadAs(this.fileUploaded!.base64, this.fileUploaded!.name ?? '');
    }
  }

  async deleteFile() {
    this.loading = true;

    if (!!this.deleteFunction) {
      const id = await this.deleteFunction(this.fileUploaded!);
      this.deletedFile.emit(id);
    } else {
      this.deletedFile.emit(this.fileUploaded!.id);
    }

    this.loading = false;
    this.fileUploaded = null;
    this.fileInput.nativeElement.value = null;
  }

  validarTamanhoArquivo(file: any): boolean {
    if (file == null) return true;

    if (file.size > this.maxFileSizeMB * 1024 * 1024) {
      this.notificationService.showError('Tamanho de arquivo excedido.', `Tamanho máximo de ${this.maxFileSizeMB}MB`);
      return false;
    }

    return true;
  }
}
