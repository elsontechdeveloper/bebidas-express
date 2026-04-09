import { Injectable, signal, inject } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = signal(false);
  private router = inject(Router);

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.show();
      } else if (event instanceof NavigationEnd || event instanceof NavigationError) {
        setTimeout(() => this.hide(), 300);
      }
    });
  }

  show() {
    this.isLoading.set(true);
  }

  hide() {
    this.isLoading.set(false);
  }
}