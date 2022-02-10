import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html'
})
export class AddProductComponent {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private fb: FormBuilder) {
  }

  productForm = this.fb.group({
    name: [''],
    description: [''],
    price: ['']
  });

  onSubmit() {
    const formContents = this.productForm.value;
    this.http.post<Product>(this.baseUrl + 'api/Products', formContents).subscribe();
  }

}

interface Product {
  name: string;
  price: number;
  description: string;
}
