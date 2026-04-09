import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

interface Order {
  id: string;
  date: Date;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'completed';
  deliveryType: 'delivery' | 'pickup';
}

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatChipsModule,
    MatDividerModule
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})
export class PedidosComponent {
  selectedTab = signal(0);

  orders: Order[] = [
    {
      id: 'PED-2026-0042',
      date: new Date('2026-04-07'),
      items: [
        { name: 'Skol Pilsen 600ml', quantity: 6, price: 29.94 },
        { name: 'Carvão 5kg', quantity: 1, price: 16.90 }
      ],
      total: 46.84,
      status: 'completed',
      deliveryType: 'pickup'
    },
    {
      id: 'PED-2026-0038',
      date: new Date('2026-04-05'),
      items: [
        { name: 'Heineken 600ml', quantity: 4, price: 31.96 },
        { name: 'Red Bull 250ml', quantity: 2, price: 17.98 }
      ],
      total: 49.94,
      status: 'completed',
      deliveryType: 'delivery'
    },
    {
      id: 'PED-2026-0031',
      date: new Date('2026-04-02'),
      items: [
        { name: 'Combo Churrasco Premium', quantity: 1, price: 89.90 }
      ],
      total: 89.90,
      status: 'completed',
      deliveryType: 'pickup'
    }
  ];

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      pending: '#ff9800',
      preparing: '#2196f3',
      ready: '#4caf50',
      delivered: '#9c27b0',
      completed: '#4caf50'
    };
    return colors[status] || '#666';
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      pending: 'Pendente',
      preparing: 'Preparando',
      ready: 'Pronto',
      delivered: 'Em Entrega',
      completed: 'Entregue'
    };
    return labels[status] || status;
  }

  trackOrder(orderId: string) {
    alert(`Rastreando pedido ${orderId}...`);
  }
}
