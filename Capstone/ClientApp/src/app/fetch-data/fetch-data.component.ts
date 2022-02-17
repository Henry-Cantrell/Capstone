import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {

  /*Get method and contents for product displaying*/

  public products: Product[];
  quantity = 1;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private fb: FormBuilder) {
    http.get<Product[]>(baseUrl + 'api/Products').subscribe(result => {
      var productsAtQuantity = result.filter(item => item.quantity >= 5)
      this.products = productsAtQuantity;
    }, error => console.error(error));
  }

  /*Post method and contents for cart items*/

  getQuantityForm = this.fb.group({
    quantity: ['']
  });

  onClick(event) {
    var target = event.target;
    var ProductId = target.attributes.id.nodeValue * 1;

    if (this.getQuantityForm.value.quantity) {
      this.quantity = Number(this.getQuantityForm.value.quantity);
    }

    var cartItem = {
      productId: ProductId,
      customerId: '',
      quantity: this.quantity
    }

    this.http.post<CartItem>(this.baseUrl + 'api/CartItems', cartItem).subscribe();

    this.http.get<Product>(this.baseUrl + `api/Products/${ProductId}`).subscribe(result => {
      var updateQuantity = {
        Id: ProductId,
        name: result.name,
        price: result.price,
        description: result.description,
        quantity: result.quantity - this.quantity
      }
      this.http.put<Product>(this.baseUrl + `api/Products/${ProductId}`, updateQuantity).subscribe();
    })
  }

}

interface Product {
  Id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
}

interface CartItem {
  productId: number;
  customerId: string;
  quantity: number;
}


