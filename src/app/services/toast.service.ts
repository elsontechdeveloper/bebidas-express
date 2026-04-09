import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  position: 'top' | 'middle' | 'bottom';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts = signal<ToastMessage[]>([]);
  private idCounter = 0;

  show(message: string, type: 'success' | 'error' | 'info' = 'success', position: 'top' | 'middle' | 'bottom' = 'top', duration = 3000) {
    const id = ++this.idCounter;
    this.toasts.update(toasts => [...toasts, { id, message, type, position }]);

    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  success(message: string, position: 'top' | 'middle' | 'bottom' = 'top') {
    this.show(message, 'success', position);
  }

  error(message: string, position: 'top' | 'middle' | 'bottom' = 'top') {
    this.show(message, 'error', position);
  }

  info(message: string, position: 'top' | 'middle' | 'bottom' = 'top') {
    this.show(message, 'info', position);
  }

  remove(id: number) {
    this.toasts.update(toasts => toasts.filter(t => t.id !== id));
  }
}