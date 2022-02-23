import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html'
})
export class AddProductComponent {

  quantity = 10;
  public categories: Category[] = [];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private fb: FormBuilder) {
    http.get<Category[]>(baseUrl + 'api/Categories').subscribe(result => {
      this.categories = result;
    })
  }

  productForm = this.fb.group({
    name: [''],
    description: [''],
    price: [''],
    quantity: this.quantity,
    categoryId: [''],
    image: ['']
  });

  categoryForm = this.fb.group({
    name: [''],
    productIdList: ['']
  });

  onSubmitProduct() {
    const formContents = this.productForm.value;
    this.quantity = formContents.quantity;
    this.http.post<Product>(this.baseUrl + 'api/Products', formContents).subscribe();
    window.location.reload();
  }

  onSubmitCategory() {
    const formContents = this.categoryForm.value;
    this.http.post<Category>(this.baseUrl + 'api/Categories', formContents).subscribe();
    window.location.reload();
  }

}

interface Product {
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
  productList: string;
}
