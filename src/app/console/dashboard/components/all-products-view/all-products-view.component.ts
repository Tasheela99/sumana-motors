import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ProductService} from '../../../../shared/services/product.service';

@Component({
  selector: 'app-all-products-view',
  imports: [
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './all-products-view.component.html',
  styleUrl: './all-products-view.component.scss'
})
export class AllProductsViewComponent implements OnInit,OnDestroy{

  products: any[] = [];
  pagedProducts: any[] = [];
  pageSize = 5;
  currentPage = 1;
  totalProducts = 0;
  private productsSubscription: Subscription | undefined;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  loadProducts(): void {
    this.productsSubscription = this.productService.getProducts().subscribe(data => {
      this.products = data.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        discount: product.discount,
        discountPrice: product.discountPrice,
        rating: product.rating,
        images: Array.isArray(product.imageUrls) && product.imageUrls.length > 0 ? product.imageUrls : [],
        userId: product.userId
      }));
      this.totalProducts = this.products.length;
      this.paginateProducts();
      console.log('Products loaded:', this.products);
    });
  }

  paginateProducts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProducts = this.products.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.paginateProducts();
  }

  get pageNumbers(): number[] {
    const pageCount = Math.ceil(this.totalProducts / this.pageSize);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  onAddProduct(): void {
    this.router.navigate(['/console/dashboard/add-product']);
  }

  onViewProduct(productId: string): void {
    console.log(productId)
    this.router.navigate([`/console/dashboard/product-detail/${productId}`]);
  }

  onDeleteProduct(productId: string): void {
    console.log('Delete product:', productId);
  }
}
