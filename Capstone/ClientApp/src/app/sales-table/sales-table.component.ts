import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sales-table',
  templateUrl: './sales-table.component.html'
})
export class SalesTableComponent {

  public salesItems: SalesItem[] = [];

  //Get method and contents for sales

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    let sales: any[] = [];
    let salesItemsPlaceholder: any[] = [];
    http.get<Sales[]>(baseUrl + 'api/Sales').subscribe(result => {
      sales = result;
      sales.forEach(function (item) {
        http.get<Product>(baseUrl + `api/Products/${item.productId}`).subscribe(result => {
          var saleItem = {
            productName: result.name,
            customerId: item.customerId,
            quantity: result.quantity
          }
          salesItemsPlaceholder.push(saleItem);
        })
      })
      this.salesItems = salesItemsPlaceholder;
    }, error => console.error(error));
  }
}

interface Product {
  id: number,
  name: string;
  price: number;
  description: string;
  quantity: number;
  categoryId: number;
}

interface Sales {
  id: number,
  productId: number;
  customerId: string;
  quantity: number;
}

interface SalesItem {
  productName: string;
  customerEmail: string;
  quantity: number;
}


