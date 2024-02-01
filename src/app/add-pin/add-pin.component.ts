import { Component, OnInit } from '@angular/core';
import { FileuploadService } from '../services/fileupload.service';

@Component({
  selector: 'app-add-pin',
  templateUrl: './add-pin.component.html',
  styleUrls: ['./add-pin.component.css']
})
export class AddPinComponent implements OnInit {

  constructor(public fileUploadService: FileuploadService) { }

  ngOnInit(): void {
  }

  public uploadAll(): void {
    this.fileUploadService.uploadAll();
  }

}
