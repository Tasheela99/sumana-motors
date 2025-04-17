import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit{
  productId!: string;
  product: any;
  selectedImage: any = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;

    // Fetch product based on ID - dummy data for now
    this.product = {
      id: this.productId,
      name: 'Premium Brake Pads',
      description: 'Reliable and durable brake pads built for high-performance driving.',
      price: 89.99,
      images: [
        'https://source.unsplash.com/800x600/?brakes',
        'https://source.unsplash.com/800x600/?car,parts',
        'https://source.unsplash.com/800x600/?vehicle,repair',
      ],
      discount: 20,
      rating:4
    };

    this.selectedImage = this.product.images[0];
  }

  selectImage(img: any): void {
    this.selectedImage = img;
  }
}
