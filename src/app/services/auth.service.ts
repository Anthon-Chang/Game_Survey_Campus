import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser$ = new BehaviorSubject<User | null>(null);

  constructor(private auth: Auth, private router: Router) {
    onAuthStateChanged(this.auth, user => {
      this.currentUser$.next(user);
    });
  }

  get currentUser(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  get currentUserValue(): User | null {
    return this.currentUser$.value;
  }

  async register(email: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(this.auth, email, password);
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  isLoggedIn(): boolean {
    return !!this.currentUser$.value;
  }
}