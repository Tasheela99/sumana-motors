import {Routes} from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {AboutComponent} from './core/about/about.component';
import {ContactComponent} from './core/contact/contact.component';
import {ProductsComponent} from './core/products/products.component';
import {ProductDetailComponent} from './core/products/product-detail/product-detail.component';
import {LoginComponent} from './security/login/login.component';
import {DashboardComponent} from './console/dashboard/dashboard.component';
import {ConsoleComponent} from './console/console/console.component';
import {AuthGuard} from '@angular/fire/auth-guard';
import {CoreContextComponent} from './core/core-context/core-context.component';
import {AllProductsViewComponent} from './console/dashboard/components/all-products-view/all-products-view.component';
import {AddNewProductComponent} from './console/dashboard/components/add-new-product/add-new-product.component';
import {ViewProductComponent} from './console/dashboard/components/view-product/view-product.component';

export const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  {
    path: '', component: CoreContextComponent, children: [
      {path: 'home', component: HomeComponent},
      {path: 'about', component: AboutComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'product/:id', component: ProductDetailComponent},
    ]
  },
  {path: 'security/login', component: LoginComponent},
  {
    path: 'console', component: ConsoleComponent, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent,children:[
          {path:'',redirectTo:'products',pathMatch:'full'},
          {path:'products',component:AllProductsViewComponent},
          {path:'add-product',component:AddNewProductComponent},
          {path:'product-detail/:id',component:ViewProductComponent},
        ]
      },
    ]
  }

];
