import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-qty-btn',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  template: `
    <button 
      mat-icon-button 
      class="qty-btn"
      [matTooltip]="tooltip"
      (click)="onClick.emit($event)">
      <mat-icon>{{ icon }}</mat-icon>
    </button>
  `,
  styles: [`
    .qty-btn {
      width: 24px;
      height: 24px;
      line-height: 24px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: none;
      border: none;

      .mat-icon {
        font-size: 14px;
        width: 14px;
        height: 14px;
        line-height: 14px;
        margin: auto;
      }

      &.add {
        background: #4caf50;
        color: white;
      }

      &.remove {
        background: #f44336;
        color: white;
      }

      &.delete {
        background: #f44336;
        color: white;
        
        .mat-icon {
          font-size: 16px;
          width: 16px;
          height: 16px;
          line-height: 16px;
        }
      }
    }
  `]
})
export class QtyBtnComponent {
  @Input() icon = 'add';
  @Input() tooltip = '';
  @Input() type: 'add' | 'remove' | 'delete' = 'add';
  @Output() onClick = new EventEmitter<any>();
}