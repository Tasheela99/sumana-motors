import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../../shared/services/product.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-view-product',
  imports: [
    NgClass,
    NgForOf,
    NgIf
  ],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
})
export class ViewProductComponent implements OnInit, OnDestroy {
  productId: string | null = null;
  product: any = {
    name: '',
    description: '',
    price: 0,
    images: []
  };
  selectedImage: string = '';
  private productSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId) {
        this.loadProduct(this.productId);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

  loadProduct(id: string): void {
    this.productSubscription = this.productService.getProducts().subscribe(products => {
      const foundProduct = products.find(p => p.id === id);
      if (foundProduct) {
        this.product = {
          ...foundProduct,
          images: Array.isArray(foundProduct.imageUrls) ? foundProduct.imageUrls : []
        };
        this.selectedImage = this.product.images[0] || '';
        console.log('Loaded Product:', this.product);
      } else {
        console.log('Product not found with ID:', id);
      }
    });
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }
}
