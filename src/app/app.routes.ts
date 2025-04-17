import {Routes} from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {AboutComponent} from './core/about/about.component';
import {ContactComponent} from './core/contact/contact.component';
import {ProductsComponent} from './core/products/products.component';
import {ProductDetailComponent} from './core/products/product-detail/product-detail.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'product/:id', component: ProductDetailComponent}

];
