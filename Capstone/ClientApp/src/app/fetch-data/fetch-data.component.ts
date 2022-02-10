import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

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

  cartItemForm = this.fb.group({
    productId: ['']
  });

  onSubmit() {

    const formContents = this.cartItemForm.value;
    console.log(formContents);
    //this.http.post<CartItem>(this.baseUrl + 'api/CartItems', formContents).subscribe();

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


