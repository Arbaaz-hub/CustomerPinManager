import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Customer } from '../modal/customer.modal';
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  customerForm!: FormGroup;
  allCustomer: Customer[] = [];
  allRegions: string[] = [];
  filteredCountry: string[] = [];

  constructor(public activeModal: NgbActiveModal, private _apiService: ApiService,
    private _countryService: CountryService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      title: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/),
      ]),
      region: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    });

    // I am not calling this method because API through CORS oring error.
    // this.getAllContries();

    this.allCustomer = this._apiService.getCustomerData();
    this.allRegions = Array.from(new Set(Object.values(this._countryService.countryList).map(item => item.region)));
  }

  getSelectedRegion(selectedRegion: any) {
    this.filteredCountry = Object.values(this._countryService.countryList)
      .filter(item => item.region === selectedRegion)
      .map(item => item.country);
  }

  // This method is used to get all countries.
  getAllContries(): void {
    this._apiService.getCountryData()
      .subscribe(({
        next: (res: any) => {
          console.log(res)
        },
        error: (err) => { console.log(err) }
      }))
  }

  // This method is used to add the customer data.
  addCustomer(): void {
    this.customerForm.markAllAsTouched();

    if (!!this.customerForm?.invalid) {
      return;
    }

    this.allCustomer.push(this.customerForm.value);
    localStorage.setItem('customerData', JSON.stringify(this.allCustomer));
    this.toastr.success('Customer Added Successfully!');
    this.activeModal.close();
  }
}
