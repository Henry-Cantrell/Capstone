import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fetch-category',
  templateUrl: './fetch-category.component.html'
})
export class FetchCategoryComponent {

  /*Get method and contents for product displaying*/

  public categories: Category[] = [];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private fb: FormBuilder, public router: Router) {
    http.get<Category[]>(baseUrl + 'api/Categories').subscribe(result => {
      this.categories = result;
    }, error => console.error(error));
  }

  onSubmit(event) {
    var target = event.target;
    var id = target.attributes.id.nodeValue * 1;

    this.router.navigate([`fetch-data/${id}`]);
  }

}

interface Category {
  id: number;
  name: string;
}


