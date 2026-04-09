import { inject } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { LoadingService } from '../services/loading.service';

export function loadingInterceptor() {
  const router = inject(Router);
  const loadingService = inject(LoadingService);

  router.events.subscribe(event => {
    if (event instanceof NavigationStart) {
      loadingService.show();
    } else if (event instanceof NavigationEnd) {
      setTimeout(() => loadingService.hide(), 300);
    }
  });
}