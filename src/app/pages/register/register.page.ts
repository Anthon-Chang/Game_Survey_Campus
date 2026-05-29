import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  email = '';
  password = '';
  confirmPassword = '';
  loading = false;
  errorMsg = '';
  showPassword = false;

  constructor(private authService: AuthService) {}

  async onRegister() {
    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMsg = 'Por favor completa todos los campos.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'Las contraseñas no coinciden.';
      return;
    }
    if (this.password.length < 6) {
      this.errorMsg = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }
    this.loading = true;
    this.errorMsg = '';
    try {
      await this.authService.register(this.email, this.password);
    } catch (e: any) {
      this.errorMsg = this.getFriendlyError(e.code);
    } finally {
      this.loading = false;
    }
  }

  private getFriendlyError(code: string): string {
    const errors: Record<string, string> = {
      'auth/email-already-in-use': 'Ya existe una cuenta con ese correo.',
      'auth/invalid-email': 'Correo inválido.',
      'auth/weak-password': 'Contraseña muy débil.',
    };
    return errors[code] || 'Error al registrarse. Intenta de nuevo.';
  }
}