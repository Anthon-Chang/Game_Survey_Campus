import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { SurveyService } from '../../services/survey.service';
import { Survey } from '../../models/survey.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  userEmail = '';
  surveys: Survey[] = [];

  constructor(
    private authService: AuthService,
    private surveyService: SurveyService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    const user = this.authService.currentUserValue;
    this.userEmail = user?.email || '';
    if (user?.uid) {
      this.surveyService.getMySurveys(user.uid).subscribe(data => {
        this.surveys = data;
      });
    }
  }

  get totalSurveys(): number { return this.surveys.length; }

  get uniqueGames(): number {
    return new Set(this.surveys.map(s => s.favoriteGame.toLowerCase())).size;
  }

  get uniqueLocations(): number {
    return new Set(this.surveys.map(s => s.campusLocation)).size;
  }

  openDashboard() {
    window.open('https://TU_PROJECT.web.app', '_blank');
  }

  async onLogout() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro que quieres salir?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Salir', role: 'destructive', handler: () => this.authService.logout() }
      ]
    });
    await alert.present();
  }
}