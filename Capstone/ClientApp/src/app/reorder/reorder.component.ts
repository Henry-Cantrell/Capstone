import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { getegid } from 'process';

@Component({
  selector: 'app-reorder',
  templateUrl: './reorder.component.html'
})
export class ReorderComponent {

  //Get method and contents for product displaying

  public products: Product[] = [];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private fb: FormBuilder) {
    http.get<Product[]>(baseUrl + 'api/LowQuantity').subscribe(result => {
      this.products = result;
    }, error => console.error(error));
  }

  //Put method for refreshing quantity

  onClick(event) {
    var target = event.target;
    var ProductId = target.attributes.id.nodeValue * 1;

    this.http.get<Product>(this.baseUrl + `api/Products/${ProductId}`).subscribe(result => {
      var product = {
        name: result.name,
        price: result.price,
        description: result.description,
        quantity: 10,
        Id: ProductId
      }
      this.http.put<Product>(this.baseUrl + `api/Products/${ProductId}`, product).subscribe();
    }, error => console.error(error));


    window.location.reload();
  }

}

interface Product {
  Id: number
  name: string;
  price: number;
  description: string;
  quantity: number;
}




