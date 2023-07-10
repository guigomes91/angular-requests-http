import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {


  onChange(evento: any) {
    console.log(evento)

    const selectedFile = <FileList>evento.srcElement.files;
    //document.getElementById('customFileLabel')!.innerHTML = selectedFile[0].name;

    const fileNames = [];
    for (let i = 0; i < selectedFile.length; i++) {
      fileNames.push(selectedFile[i].name);
    }

    document.getElementById('customFileLabel')!.innerHTML = fileNames.join(', ');
  }
}
