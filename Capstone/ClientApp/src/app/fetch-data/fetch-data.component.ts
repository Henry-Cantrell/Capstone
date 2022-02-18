import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {

  /* Receive and assign ID for product fetching*/

  public categoryId: Number = 0;

  /*Get method and contents for product displaying*/

  public products: Product[];
  quantity = 1;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private fb: FormBuilder, private _Activatedroute: ActivatedRoute) {
    //Assign id from passed param
    this.categoryId = Number(this._Activatedroute.snapshot.paramMap.get("id"));
    console.log(this.categoryId);

    http.get<Product[]>(baseUrl + 'api/Products').subscribe(result => {
      var productsAtCriteria = result.filter(item => item.categoryId == this.categoryId && item.quantity >= 5)
      this.products = productsAtCriteria
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
        quantity: result.quantity - this.quantity,
        categoryId: result.categoryId
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
  categoryId: number;
}

interface CartItem {
  productId: number;
  customerId: string;
  quantity: number;
}


