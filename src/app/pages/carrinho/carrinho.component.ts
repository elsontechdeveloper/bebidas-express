import { Component, inject, computed, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';
import { QtyBtnComponent } from '../../components/qty-btn/qty-btn.component';

interface DialogData {
  items: { product: { name: string; price: number }; quantity: number }[];
  total: number;
}

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatTableModule,
    MatDialogModule,
    QtyBtnComponent
  ],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.scss'
})
export class CarrinhoComponent {
  private cartService = inject(CartService);
  private dialog = inject(MatDialog);

  items = this.cartService.cartItems;
  displayedColumns = ['image', 'name', 'price', 'quantity', 'total', 'actions'];

  subtotal = computed(() => {
    return this.items().reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  });

  totalItems = computed(() => {
    return this.items().reduce((sum, item) => sum + item.quantity, 0);
  });

  updateQuantity(productId: number, change: number) {
    this.cartService.updateQuantity(productId, this.items().find(i => i.product.id === productId)!.quantity + change);
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.cartItems.set([]);
    this.cartService.cartCount.set(0);
  }

  finishOrder() {
    const dialogRef = this.dialog.open(ConfirmOrderDialog, {
      width: '400px',
      data: { 
        items: this.items(), 
        total: this.subtotal() 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sendToWhatsApp();
        this.clearCart();
      }
    });
  }

  private sendToWhatsApp() {
    const message = 'Olá! Gerei o pedido:\n';
    let itemsList = '';
    
    this.items().forEach(item => {
      itemsList += `- ${item.product.name} x${item.quantity}: R$ ${(item.product.price * item.quantity).toFixed(2)}\n`;
    });
    
    const total = `\n\nTotal: R$ ${this.subtotal().toFixed(2)}`;
    const text = encodeURIComponent(message + itemsList + total);
    const url = `https://wa.me/5586988396753?text=${text}`;
    window.open(url, '_blank');
  }
}

@Component({
  selector: 'confirm-order-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>Confirmar Pedido</h2>
    <mat-dialog-content>
      <div class="order-summary">
        <p><strong>{{ data.items.length }} itens no pedido</strong></p>
        <p class="total">Total: R$ {{ data.total | number:'1.2-2' }}</p>
      </div>
      <p class="info">Seu pedido será enviado para o WhatsApp. O carrinho será esvaziado após o envio.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close(false)">Cancelar</button>
      <button mat-raised-button color="primary" (click)="dialogRef.close(true)">
        <mat-icon>send</mat-icon> Enviar Pedido
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .order-summary {
      background: #f5f5f5;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 15px;
    }
    .total {
      font-size: 18px;
      font-weight: bold;
      color: #333;
    }
    .info {
      color: #666;
      font-size: 14px;
    }
  `]
})
export class ConfirmOrderDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmOrderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}
