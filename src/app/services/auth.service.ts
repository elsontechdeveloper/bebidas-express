import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoggedUser {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'elson_bebidas_users';
  private currentUserKey = 'elson_bebidas_current_user';

  currentUser = signal<LoggedUser | null>(null);

  isLoggedIn = computed(() => this.currentUser() !== null);

  constructor(private router: Router) {
    this.loadCurrentUser();
  }

  private loadCurrentUser() {
    const stored = localStorage.getItem(this.currentUserKey);
    if (stored) {
      const user: LoggedUser = JSON.parse(stored);
      this.currentUser.set(user);
    }
  }

  register(name: string, email: string, phone: string, password: string): { success: boolean; message: string } {
    const users = this.getUsers();
    
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email já cadastrado' };
    }

    const newUser: User = {
      id: Date.now(),
      name,
      email,
      phone,
      password
    };

    users.push(newUser);
    localStorage.setItem(this.storageKey, JSON.stringify(users));

    return { success: true, message: 'Cadastro realizado com sucesso!' };
  }

  login(email: string, password: string): { success: boolean; message: string } {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return { success: false, message: 'Email ou senha incorretos' };
    }

    const userWithoutPassword: LoggedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone
    };
    
    localStorage.setItem(this.currentUserKey, JSON.stringify(userWithoutPassword));
    this.currentUser.set(userWithoutPassword);

    return { success: true, message: 'Login realizado com sucesso!' };
  }

  logout() {
    localStorage.removeItem(this.currentUserKey);
    this.currentUser.set(null);
    this.router.navigate(['/']);
  }

  private getUsers(): User[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }
}
