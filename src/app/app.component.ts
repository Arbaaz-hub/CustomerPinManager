import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddPinComponent } from './add-pin/add-pin.component';
import { ApiService } from './services/api.service';
import { Pin } from './modal/pin.modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  pinList: Pin[] = [];

  constructor(private modalService: NgbModal, private _apiService: ApiService){}

  ngOnInit(): void {
    this.pinList = this._apiService.getPinData();
  }

  // This method is used to open customer modal.
  openCustomerModal() {
    this.modalService.open(AddCustomerComponent, { centered: true });
  }

  // This method is used to open Pin modal.
  openPinModal() {
    let modalRef =  this.modalService.open(AddPinComponent, { centered: true });

    modalRef.result.then((result) => {
      this.pinList = this._apiService.getPinData();
    });
  }
}
