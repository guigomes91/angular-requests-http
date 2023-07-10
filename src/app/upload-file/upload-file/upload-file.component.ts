import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files!: Set<File>;

  constructor(private service: UploadFileService){}

  ngOnInit() {}

  onChange(evento: any) {
    console.log(evento)

    const selectedFile = <FileList>evento.srcElement.files;
    //document.getElementById('customFileLabel')!.innerHTML = selectedFile[0].name;

    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectedFile.length; i++) {
      fileNames.push(selectedFile[i].name);
      this.files.add(selectedFile[i]);
    }

    document.getElementById('customFileLabel')!.innerHTML = fileNames.join(', ');
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service.upload(this.files, 'http://localhost:8000/upload')
      .subscribe(response => console.log('Upload concluído!'));
    }
  }
}
