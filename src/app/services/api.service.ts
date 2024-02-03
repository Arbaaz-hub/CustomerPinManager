import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../modal/customer.modal';
import { Pin } from '../modal/pin.modal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // This method is used to get all region and country data.
  // This API "https://api.first.org/data/v1/countries" is showing cors origin issue when i call it.
  // So i create a country service and attach data on it to filter country and region.
  getCountryData(): Observable<any> {
    return this.http.get(environment?.apiUrl + '/countries');
  }

  // This method is used to get the customer data from local storage.
  getCustomerData() {
    let allCustomer: Customer[] = [];
    const storedData = localStorage.getItem('customerData');
    if(storedData){
      allCustomer = JSON.parse(storedData)
    }
    return allCustomer;
  }

  // This method is used to get the pin data from local storage.
  getPinData() {
    let allPins: Pin[] = [];
    const storedData = localStorage.getItem('pinData');
    if(storedData){
      allPins = JSON.parse(storedData)
    }
    return allPins;
  }
}
