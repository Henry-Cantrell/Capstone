import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { getegid } from 'process';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {

  //Get method and contents for product displaying

  public products: Product[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private fb: FormBuilder) {
    http.get<Product[]>(baseUrl + 'api/Products').subscribe(result => {
      this.products = result;
    }, error => console.error(error));
  }

  //Post method and contents for cart items

  onClick(event) {
    var target = event.target;
    var productId = target.attributes.id;

    this.http.post<CartItem>(this.baseUrl + 'api/CartItems', productId).subscribe();

  }

}

interface Product {
  name: string;
  price: number;
  description: string;
}

interface CartItem {
  name: string;
  productId: number;
  customerId: string;
}


