import { Component, OnInit } from '@angular/core';
import { FileuploadService } from '../services/fileupload.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-pin',
  templateUrl: './add-pin.component.html',
  styleUrls: ['./add-pin.component.css']
})
export class AddPinComponent implements OnInit {
  pinForm!: FormGroup;

  constructor(public fileUploadService: FileuploadService) { }

  ngOnInit(): void {
    this.pinForm = new FormGroup({
      title: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      collaborators: new FormControl('', Validators.required),
      privacy: new FormControl('private', Validators.required),
    })
  }

  public uploadAll(): void {
    this.fileUploadService.uploadAll();
  }

  addPin(): void {
    this.pinForm.markAllAsTouched();

    if (!!this.pinForm?.invalid) {
      return;
    }
  }

}
