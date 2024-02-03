import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Pin } from '../modal/pin.modal';
import { Customer } from '../modal/customer.modal';

@Component({
  selector: 'app-add-pin',
  templateUrl: './add-pin.component.html',
  styleUrls: ['./add-pin.component.css']
})
export class AddPinComponent implements OnInit {
  pinForm!: FormGroup;
  allPins: Pin[] = [];
  file!: File;
  allCollaborators: Customer[] = [];
  imagePreview: string = '';
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  constructor(private _apiService: ApiService, public activeModal: NgbActiveModal, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.pinForm = new FormGroup({
      title: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      collaborators: new FormControl('', Validators.required),
      privacy: new FormControl('private', Validators.required),
    });

    this.allCollaborators = this._apiService.getCustomerData();
    this.allPins = this._apiService.getPinData();
  }

  // This method is used to validate the image and show the preview.
  handleFileInput(event: any): void {
    this.file = event?.target?.files?.[0];
    
    if (!this.file.type.includes('image')) {
      if (this.fileInput) {
        this.fileInput.nativeElement.value = '';
        this.toastr.error('Please select an image!');
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.file);
  }

  // This method is used to add pin data.
  addPin(): void {
    this.pinForm.markAllAsTouched();

    if (!!this.pinForm?.invalid) {
      return;
    }

    let storedFile: Pin = { 
      title: this.pinForm.get('title')!.value,
      image: this.imagePreview,
      collaborators: this.pinForm.get('collaborators')!.value,
      privacy: this.pinForm.get('privacy')!.value
     };

     this.allPins.push(storedFile);
     localStorage.setItem('pinData', JSON.stringify(this.allPins));
     this.activeModal.close();
     this.toastr.success('Pin Added Successfully!');
  }
}
