import { Routes } from '@angular/router';
import { ConstrucaoComponent } from './pages/construcao/construcao.component';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'promocoes', 
    loadComponent: () => import('./pages/promocoes/promocoes.component').then(m => m.PromocoesComponent) 
  },
  { 
    path: 'carrinho', 
    loadComponent: () => import('./pages/carrinho/carrinho.component').then(m => m.CarrinhoComponent) 
  },
  { 
    path: 'pedidos', 
    loadComponent: () => import('./pages/pedidos/pedidos.component').then(m => m.PedidosComponent) 
  },
  { 
    path: 'login', 
    loadComponent: () => import('./pages/auth/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./pages/auth/register.component').then(m => m.RegisterComponent) 
  },
  { path: 'cervejas', component: ConstrucaoComponent },
  { path: 'destilados', component: ConstrucaoComponent },
  { path: 'energeticos', component: ConstrucaoComponent },
  { path: 'agua-sucos', component: ConstrucaoComponent },
  { path: 'gelo-carvao', component: ConstrucaoComponent },
  { path: 'combos', component: ConstrucaoComponent },
  { path: 'sobre', component: ConstrucaoComponent },
  { path: 'contato', component: ConstrucaoComponent },
  { path: '**', redirectTo: '' }
];
