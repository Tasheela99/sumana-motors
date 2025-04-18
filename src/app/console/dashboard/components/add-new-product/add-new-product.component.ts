import {Component, inject, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../../shared/services/product.service';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import {Auth} from '@angular/fire/auth';

@Component({
  selector: 'app-add-new-product',
  imports: [
    FormsModule,
    NgClass,
    NgForOf,
    NgIf
  ],
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.scss'
})
export class AddNewProductComponent implements OnInit {
  product: any = {
    name: '',
    description: '',
    price: 0,
    discount: 0,
    rating: 0,
    imageUrls: [],
    discountPrice: null,
    userId: null
  };

  selectedFiles: File[] = [];
  isUploading: boolean = false;
  uploadProgress: number = 0;
  previewUrls: { [key: string]: string } = {};
  errorMessage: string = '';

  private auth: Auth = inject(Auth);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const files = Array.from(event.target.files) as File[];
      this.selectedFiles = [...this.selectedFiles, ...files];

      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewUrls[file.name] = e.target.result as string;
        };
        reader.readAsDataURL(file);
      });
    }
  }

  getPreviewUrl(file: File): string {
    return this.previewUrls[file.name] || '';
  }

  removeFile(file: File): void {
    this.selectedFiles = this.selectedFiles.filter(f => f !== file);
    delete this.previewUrls[file.name]; // Remove preview URL as well
  }

  async onSubmit(): Promise<void> {
    if (this.product.name && this.product.price) {
      this.errorMessage = '';
      try {
        this.isUploading = true;
        this.uploadProgress = 0; // Reset progress

        const user = this.auth.currentUser;
        if (user) {
          this.product.userId = user.uid;
        } else {
          this.errorMessage = 'User not authenticated.';
          alert(this.errorMessage);
          return;
        }

        // Calculate discount price based on a direct discount amount
        if (this.product.discount > 0) {
          this.product.discountPrice = this.product.price - this.product.discount;
          // Ensure discountPrice is not negative
          if (this.product.discountPrice < 0) {
            this.product.discountPrice = 0;
          }
        } else {
          this.product.discountPrice = this.product.price;
        }

        await this.productService.saveProductWithImages(this.product, this.selectedFiles);

        this.product = { name: '', description: '', price: 0, discount: 0, rating: 0, imageUrls: [], userId: null, discountPrice: null };
        this.selectedFiles = [];
        this.previewUrls = {};
        alert('Product added successfully!');

      } catch (error: any) {
        console.error('Error adding product:', error);
        this.errorMessage = error.message || 'Failed to add product. Please try again.';
        alert(this.errorMessage);
      } finally {
        this.isUploading = false;
        this.uploadProgress = 0;
      }
    } else {
      alert('Please enter product name and price.');
    }
  }
}
