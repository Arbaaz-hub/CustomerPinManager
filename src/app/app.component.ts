import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddPinComponent } from './add-pin/add-pin.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private modalService: NgbModal){}

  openCustomerModal() {
    const modalRef = this.modalService.open(AddCustomerComponent, { centered: true });

    // Subscribe to the modal's result to handle any actions after the modal is closed
    modalRef.result.then((result) => {
      console.log('Modal closed with result:', result);
    }, (reason) => {
      console.log('Modal dismissed with reason:', reason);
    });
  }

  openPinModal() {
    const modalRef = this.modalService.open(AddPinComponent, { centered: true });

    // Subscribe to the modal's result to handle any actions after the modal is closed
    modalRef.result.then((result) => {
      console.log('Modal closed with result:', result);
    }, (reason) => {
      console.log('Modal dismissed with reason:', reason);
    });
  }
}
