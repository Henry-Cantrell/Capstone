import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html'
})
export class AddProductComponent {

  quantity = 10;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private fb: FormBuilder) {
  }

  productForm = this.fb.group({
    name: [''],
    description: [''],
    price: [''],
    quantity: this.quantity
  });

  onSubmit() {
    const formContents = this.productForm.value;
    this.quantity = formContents.quantity;
    this.http.post<Product>(this.baseUrl + 'api/Products', formContents).subscribe();
    window.location.reload();
  }

}

interface Product {
  name: string;
  description: string;
  price: number;
  quantity: number;
}
