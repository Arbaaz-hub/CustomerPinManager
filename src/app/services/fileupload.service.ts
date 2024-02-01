import { Injectable } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {
  public uploader: FileUploader = new FileUploader({ url: 'your_upload_endpoint' });

  constructor() {
   }

   public uploadAll(): void {
    this.uploader.uploadAll();
  }
}
