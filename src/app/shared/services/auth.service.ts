import {inject, Injectable} from '@angular/core';
import {Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, map} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  private loggedIn = new BehaviorSubject<boolean>(false);
  readonly isLoggedIn: Observable<boolean> = this.loggedIn.asObservable();
  readonly user = authState(this.auth);

  constructor() {
    this.user.subscribe(user => {
      this.loggedIn.next(!!user);
    });
  }

  async signup(email: string, password: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('Successfully signed up!', userCredential.user);
      await this.router.navigate(['/console']);
    } catch (error: any) {
      throw error;
    }
  }

  async login(email: any, password: any): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Successfully logged in!', userCredential.user);
    } catch (error: any) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      await this.router.navigate(['/home']);
    } catch (error) {
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }

  getAuthState(): Observable<boolean> {
    return this.isLoggedIn;
  }

  // Changed to return an Observable of the user instead of directly accessing currentUser
  getCurrentUser(): Observable<any> {
    return this.user;
  }

  // If you need the user synchronously, use this method with caution
  // and ensure it's only called within contexts that have access to Auth
  getCurrentUserSync() {
    // Warning: Only use this when you're sure you're in a proper injection context
    return this.auth.currentUser;
  }
}
