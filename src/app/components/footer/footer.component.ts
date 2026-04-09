import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  openWhatsApp() {
    const message = 'Olá! Gerei um pedido no site Elson Bebidas';
    const url = `https://wa.me/5586988396753?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
}
