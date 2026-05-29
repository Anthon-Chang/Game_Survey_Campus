import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email = '';
  password = '';
  loading = false;
  errorMsg = '';
  showPassword = false;

  constructor(private authService: AuthService) {}

  async onLogin() {
    if (!this.email || !this.password) {
      this.errorMsg = 'Por favor completa todos los campos.';
      return;
    }
    this.loading = true;
    this.errorMsg = '';
    try {
      await this.authService.login(this.email, this.password);
    } catch (e: any) {
      this.errorMsg = this.getFriendlyError(e.code);
    } finally {
      this.loading = false;
    }
  }

  private getFriendlyError(code: string): string {
    const errors: Record<string, string> = {
      'auth/user-not-found': 'No existe una cuenta con ese correo.',
      'auth/wrong-password': 'Contraseña incorrecta.',
      'auth/invalid-email': 'Correo inválido.',
      'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde.',
    };
    return errors[code] || 'Error al iniciar sesión. Verifica tus datos.';
  }
}