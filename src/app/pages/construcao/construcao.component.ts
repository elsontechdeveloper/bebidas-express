import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-construcao',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule],
  template: `
    <div class="construcao-page">
      <div class="content">
        <div class="icon">
          <i class="fas fa-hard-hat"></i>
        </div>
        <h1>EM CONSTRUÇÃO</h1>
        <p>Esta página ainda está sendo desenvolvida.</p>
        <p class="sub">Em breve estará disponível com novas funcionalidades!</p>
        <a routerLink="/" mat-raised-button color="primary">
          <mat-icon>home</mat-icon> Voltar ao Início
        </a>
      </div>
    </div>
  `,
  styles: [`
    .construcao-page {
      min-height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #f5f5f5 0%, #fff 100%);
      padding: 40px 20px;
    }

    .content {
      text-align: center;
      max-width: 500px;
    }

    .icon {
      margin-bottom: 30px;

      i {
        font-size: 100px;
        color: #FFC107;
        animation: bounce 2s infinite;
      }
    }

    h1 {
      font-size: 36px;
      color: #333;
      margin-bottom: 15px;
      font-weight: 700;
    }

    p {
      font-size: 18px;
      color: #666;
      margin-bottom: 10px;
    }

    .sub {
      font-size: 14px;
      color: #999;
      margin-bottom: 30px;
    }

    a {
      mat-icon {
        margin-right: 8px;
      }
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-20px);
      }
      60% {
        transform: translateY(-10px);
      }
    }
  `]
})
export class ConstrucaoComponent {}