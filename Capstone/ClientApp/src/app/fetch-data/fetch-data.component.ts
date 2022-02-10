import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {

  //Get method and contents

  public products: Product[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private fb: FormBuilder) {
    http.get<Product[]>(baseUrl + 'api/Products').subscribe(result => {
      this.products = result;
    }, error => console.error(error));
  }

  //Post method and contents

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
