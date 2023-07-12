import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  files!: Set<File>;
  progress: number = 0;

  constructor(private service: UploadFileService) {}

  ngOnInit() {}

  onChange(evento: any) {
    console.log(evento);

    const selectedFile = <FileList>evento.srcElement.files;
    //document.getElementById('customFileLabel')!.innerHTML = selectedFile[0].name;

    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectedFile.length; i++) {
      fileNames.push(selectedFile[i].name);
      this.files.add(selectedFile[i]);
    }

    document.getElementById('customFileLabel')!.innerHTML =
      fileNames.join(', ');
    this.progress = 0;
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service
        .upload(this.files, '/api/upload')
        .subscribe((event: HttpEvent<Object>) => {
          //HttpEventType
          console.log(event);
          if (event.type === HttpEventType.Response) {
            console.log('Upload concluído!');
          } else if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round(
              (event.loaded * 100) / (event.total || 1)
            );
            console.log('Progress', percentDone);
            this.progress = percentDone;
          }
        });
    }
  }

  onDownloadExcel() {
    this.service.download('/api/downloadExcel').subscribe((res: any) => {
      this.service.handleFile(res, 'report.xlsx');
    });
  }

  onDownloadPDF() {
    this.service.download('/api/downloadPDF').subscribe((res: any) => {
      this.service.handleFile(res, 'report.pdf');
    });
  }
}
