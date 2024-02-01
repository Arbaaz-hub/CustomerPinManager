import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  customerForm!: FormGroup;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      title: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    })
  }

  addCustomer(): void {
    this.customerForm.markAllAsTouched();

    if (!!this.customerForm?.invalid) {
      return;
    }
  }

}
