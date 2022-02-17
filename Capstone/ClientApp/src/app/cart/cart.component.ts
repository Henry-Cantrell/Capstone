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
    window.location.reload();
  }

  onBuy(event) {
    var target = event.target;
    var CartItemId = target.attributes.id.nodeValue * 1;

    this.http.delete(this.baseUrl + `api/CartItems/${CartItemId}`).subscribe();

    var cartItem = this.cartList.filter(item => item.CartItemId == CartItemId)

    var saleItem = {
      productId: cartItem[0].productId,
      customerId: cartItem[0].customerId,
      quantity: cartItem[0].quantity
    }

    this.http.post(this.baseUrl + `api/Sales`, saleItem).subscribe();
    window.location.reload();
  }

  clearCart() {
    var http = this.http;
    var baseUrl = this.baseUrl;
    this.cartList.forEach(function (item) {
      http.delete(baseUrl + `api/CartItems/${item.id}`).subscribe();
      window.location.reload();
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
  quantity: number;
  customerId: string;
}

interface SaleItem {
  productId: number,
  customerId: string,
  quantity: number
}
