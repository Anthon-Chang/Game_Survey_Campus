import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SurveyService } from '../../services/survey.service';
import { GameApiService } from '../../services/game-api.service';
import { CameraService } from '../../services/camera.service';
import { GeolocationService } from '../../services/geolocation.service';
import { AuthService } from '../../services/auth.service';
import { Survey, GameInfo } from '../../models/survey.model';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
  standalone: false,
})
export class SurveyPage {
  survey: Partial<Survey> = {
    alias: '',
    ageRange: '',
    role: '',
    favoriteGame: '',
    platform: '',
    genre: '',
    comment: '',
    campusLocation: '',
    latitude: 0,
    longitude: 0,
  };

  photoBase64 = '';
  gameInfo: GameInfo | null = null;
  searchingGame = false;
  gameNotFound = false;
  locationObtained = false;
  gettingLocation = false;
  saving = false;
  private gameSearchTimeout: any;

  constructor(
    private surveyService: SurveyService,
    private gameApiService: GameApiService,
    private cameraService: CameraService,
    private geoService: GeolocationService,
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  searchGame() {
    const name = this.survey.favoriteGame?.trim();
    if (!name || name.length < 2) return;

    this.searchingGame = true;
    this.gameInfo = null;
    this.gameNotFound = false;

    clearTimeout(this.gameSearchTimeout);
    this.gameSearchTimeout = setTimeout(() => {
      this.gameApiService.searchGame(name).subscribe(result => {
        this.searchingGame = false;
        if (result) {
          this.gameInfo = result;
          this.survey.gameInfo = result;
        } else {
          this.gameNotFound = true;
        }
      });
    }, 800);
  }

  async takePicture() {
    const base64 = await this.cameraService.takePicture();
    if (base64) this.photoBase64 = base64;
  }

  async pickGallery() {
    const base64 = await this.cameraService.pickFromGallery();
    if (base64) this.photoBase64 = base64;
  }

  async getLocation() {
    this.gettingLocation = true;
    const pos = await this.geoService.getCurrentPosition();
    this.gettingLocation = false;

    if (pos) {
      this.survey.latitude = pos.latitude;
      this.survey.longitude = pos.longitude;
      this.locationObtained = true;
      this.showToast('✅ Ubicación capturada', 'success');
    } else {
      this.showToast('No se pudo obtener la ubicación', 'danger');
    }
  }

    isFormValid(): boolean {
      return !!(
        this.survey.alias &&
        this.survey.ageRange &&
        this.survey.role &&
        this.survey.favoriteGame &&
        this.survey.platform &&
        this.survey.genre &&
        this.survey.campusLocation &&
        this.locationObtained &&
        this.photoBase64
      );
    }

    async onSubmit() {
    if (!this.isFormValid()) {
      this.showToast('Completa todos los campos y obtén la ubicación GPS', 'warning');
      return;
    }

    this.saving = true;
    try {
      const user = this.authService.currentUserValue!;
      const surveyData: Survey = {
        ...this.survey as Survey,
        userId: user.uid,
        userEmail: user.email || '',
        timestamp: Date.now(),
        photoUrl: '',
      };

      await this.surveyService.saveSurvey(surveyData, this.photoBase64);
      this.saving = false;
      this.showToast('✅ Encuesta guardada correctamente', 'success');
      
      setTimeout(() => {
        this.router.navigateByUrl('/home', { replaceUrl: true });
      }, 1000);
      
    } catch (e: any) {
      console.error('Error:', e);
      this.showToast('Error: ' + e.message, 'danger');
      this.saving = false;
    }
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      color,
      position: 'bottom',
    });
    await toast.present();
  }
}