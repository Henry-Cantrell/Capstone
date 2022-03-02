import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html'
})
export class AddProductComponent {

  public categories: Category[] = [];
  public quantity: Number = 10;
  public imgUrl: String = "https://firebasestorage.googleapis.com/v0/b/capstone-gsp.appspot.com/o/products%2Fsnowflakes-g23c3a03a3_1920.jpg?alt=media&token=acbe647f-11e1-49e3-97aa-16dcc424b604";

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private fb: FormBuilder, private storage: AngularFireStorage) {
    http.get<Category[]>(baseUrl + 'api/Categories').subscribe(result => {
      this.categories = result;
    })
  }

  productForm = this.fb.group({
    name: [''],
    description: [''],
    price: [''],
    categoryId: [''],
    imgUrl: this.imgUrl,
    quantity: this.quantity
  });

  categoryForm = this.fb.group({
    name: [''],
    productIdList: [''],
    imgUrl: ['']
  });

  @ViewChild("imageFile") imageFile;
  @ViewChild("imageFileCat") imageFileCat;

  onSubmitProduct() {
    //upload image file to Firebase Firestorage
    const basePath = '/products';
    const fi = this.imageFile.nativeElement;
    const filePath = `${basePath}/${this.productForm.value.name}`;

    if (fi.files && fi.files[0]) {
      let image = fi.files[0];
      this.storage.upload(filePath, image)
    }

    //save product details in Dotnet backend
    const storageRef = this.storage.ref(filePath);
    storageRef.getDownloadURL().subscribe(downloadURL => {
      this.productForm.value.imgUrl = downloadURL;
      const formContents = {
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        price: this.productForm.value.price,
        quantity: this.productForm.value.quantity,
        categoryId: this.productForm.value.categoryId,
        imgUrl: this.productForm.value.imgUrl
      }
      this.http.post<Product>(this.baseUrl + 'api/Products', formContents).subscribe();
    });

    //reload page
    window.location.reload();
  }

  async onSubmitCategory() {
    console.log("Into")
    const basePath = '/categories';
    const fi = this.imageFileCat.nativeElement;
    const filePath = `${basePath}/${this.categoryForm.value.name}`;

    if (fi.files && fi.files[0]) {
      let image = fi.files[0];
      await this.storage.upload(filePath, image)
    }

    //save product details in Dotnet backend
    const storageRef = this.storage.ref(filePath);

    if (await storageRef.getDownloadURL() != null) {
      await storageRef.getDownloadURL().subscribe(downloadURL => {
        const formContents = {
          name: this.productForm.value.name,
          imgUrl: downloadURL
        }
        this.http.post<Category>(this.baseUrl + 'api/Categories', formContents).subscribe();
      });
    }
    else {
      const formContents = {
        name: this.productForm.value.name,
        imgUrl: "assets/images/default-prod.img.jpg"
      }
      this.http.post<Category>(this.baseUrl + 'api/Categories', formContents).subscribe();
    }
  }

}

interface Product {
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number;
  imgUrl: string;
}

interface Category {
  id: number;
  name: string;
  imgUrl: string;
}
