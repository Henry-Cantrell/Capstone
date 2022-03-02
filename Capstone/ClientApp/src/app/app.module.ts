import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { AddProductComponent } from './add-product/add-product.component';
import { CartComponent } from './cart/cart.component';
import { ReorderComponent } from './reorder/reorder.component';
import { SalesTableComponent } from './sales-table/sales-table.component';
import { FetchCategoryComponent } from './fetch-categories/fetch-category.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// For firebase app init

const config = {
  apiKey: "AIzaSyBqnbDub928DIDh4SISasdI9HMacxt34_Q",
  authDomain: "capstone-gsp.firebaseapp.com",
  projectId: "capstone-gsp",
  storageBucket: "capstone-gsp.appspot.com",
  messagingSenderId: "88244378488",
  appId: "1:88244378488:web:c8463f08631749a2da468d"
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FetchDataComponent,
    AddProductComponent,
    CartComponent,
    ReorderComponent,
    SalesTableComponent,
    FetchCategoryComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(config),
    AngularFireStorageModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ApiAuthorizationModule,
    RouterModule.forRoot([
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'fetch-data/:id', component: FetchDataComponent, canActivate: [AuthorizeGuard] },
    { path: 'add-product', component: AddProductComponent, canActivate: [AuthorizeGuard] },
    { path: 'cart', component: CartComponent, canActivate: [AuthorizeGuard] },
    { path: 'reorder', component: ReorderComponent, canActivate: [AuthorizeGuard] },
    { path: 'sales-table', component: SalesTableComponent, canActivate: [AuthorizeGuard] },
    { path: 'fetch-category', component: FetchCategoryComponent, canActivate: [AuthorizeGuard] }
], { relativeLinkResolution: 'legacy' }),
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
