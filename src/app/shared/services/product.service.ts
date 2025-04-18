import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, CollectionReference, DocumentReference } from '@angular/fire/firestore';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private storage: Storage = inject(Storage);
  private firestore: Firestore = inject(Firestore);
  private productsCollection: CollectionReference = collection(this.firestore, 'Products');

  // Include the document ID in the emitted objects
  products: Observable<any[]> = collectionData(this.productsCollection, { idField: 'id' }) as Observable<any[]>;

  async uploadImages(files: File[]): Promise<string[]> {
    const urls: string[] = [];

    for (const file of files) {
      const timestamp = new Date().getTime();
      const fileRef = ref(this.storage, `products/${timestamp}-${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file);
      await new Promise<void>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload progress: ${progress}%`);
          },
          (error) => {
            console.error('Upload failed:', error);
            reject(error);
          },
          async () => {
            const url = await getDownloadURL(fileRef);
            urls.push(url);
            resolve();
          }
        );
      });
    }

    return urls;
  }

  async addProduct(product: any): Promise<DocumentReference> {
    return await addDoc(this.productsCollection, product);
  }

  async saveProductWithImages(product: any, files: File[]): Promise<DocumentReference> {
    const imageUrls = await this.uploadImages(files);
    const productWithImages = {
      ...product,
      imageUrls
    };
    return await this.addProduct(productWithImages);
  }

  getProducts(): Observable<any[]> {
    return this.products;
  }
}
