import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { getegid } from 'process';

@Component({
  selector: 'app-sales-table',
  templateUrl: './sales-table.component.html'
})
export class SalesTableComponent {

  //Get method and contents for sales

  public sales: Sales[] = [];
  public products: Product[] = [];
  public salesItems: SalesItem[] = [];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    http.get<Sales[]>(baseUrl + 'api/Sales').subscribe(result => {
      this.sales = result;
      let productPlaceHolder: Product[] = [];
      this.sales.forEach(function (item) {
        http.get<Product>(baseUrl + `api/Products/${item.productId}`).subscribe(result => {
          result.quantity = item.quantity;
          productPlaceHolder.push(result);
        });
      })
     //this.products = productPlaceHolder;

     // let salesItemPlaceHolder: SalesItem[] = [];
     // this.products.forEach(function (item) {
     //   var saleItem = {
     //     productName: item.name,
     //     quantity: item.quantity,
     //     customerEmail: ''
     //   }
     //   salesItemPlaceHolder.push(saleItem);
     // })
     // this.salesItems = salesItemPlaceHolder;
    }, error => console.error(error));
  }
}

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
}

interface Sales {
  name: string;
  productId: number;
  customerId: string;
  quantity: number;
}

interface SalesItem {
  productName: string;
  customerEmail: string;
  quantity: number;
}


