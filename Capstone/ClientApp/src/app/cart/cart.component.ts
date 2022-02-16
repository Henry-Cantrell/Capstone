import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent {

  public products: Product[] = [];
  public cartList: any[] = [];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    http.get<CartItem[]>(baseUrl + 'api/CartItems').subscribe(result => {
      this.cartList = result;
      let productPlaceHolder: Product[] = [];
      this.cartList.forEach(function (item) {
        http.get<Product>(baseUrl + `api/Products/${item.productId}`).subscribe(result => {
          result.id = item.id;
          productPlaceHolder.push(result);
        });
      })
      this.products = productPlaceHolder;
    }, error => console.error(error));
  }

  onClick(event) {
    var target = event.target;
    var CartItemId = target.attributes.id.nodeValue * 1;

    this.http.delete(this.baseUrl + `api/CartItems/${CartItemId}`).subscribe();

  }

  clearCart() {
    this.cartList.forEach(function (item) {
      this.http.delete(this.baseUrl + `api/CartItems/${item.id}`).subscribe();
    })
  }
}

interface Product {
  id: number,
  name: string;
  price: number;
  description: string;
}

interface CartItem {
  id: number;
  productId: number;
  customerId: string;
}
