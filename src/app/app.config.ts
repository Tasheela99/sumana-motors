import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';

import {routes} from './app.routes';
import {provideAuth, getAuth} from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { provideStorage, getStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes, withHashLocation()), provideAuth(() => getAuth()),
    provideFirebaseApp(() =>
      initializeApp({ projectId: "sumanamotorsapp-41d5e", appId: "1:450190673921:web:2d58f63a05c38ec7025800", storageBucket: "sumanamotorsapp-41d5e.firebasestorage.app", apiKey: "AIzaSyAeIJNWc_IPGAqtKEX5ObGR7Bz6j-ZqcF0", authDomain: "sumanamotorsapp-41d5e.firebaseapp.com", messagingSenderId: "450190673921" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),provideStorage(() => getStorage()), provideFunctions(() => getFunctions())]
};
