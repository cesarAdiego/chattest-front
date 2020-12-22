import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'import-choose',
  templateUrl: './import-upload-file.component.html',
  styleUrls: ['./import-upload-file.component.scss']
})
export class ImportUploadFileComponent implements OnInit {
  apiUrl = `${environment.apiUrl}/projects/import`;
  constructor() { }

  ngOnInit(): void {
  }

  uploadFile(event) {
    console.log(event);
    console.log("Subimos un fichero");
  }
}
