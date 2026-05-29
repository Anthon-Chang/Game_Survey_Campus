import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { SurveyService } from '../../services/survey.service';
import { AuthService } from '../../services/auth.service';
import { Survey } from '../../models/survey.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, OnDestroy {
  surveys: Survey[] = [];
  loading = true;
  private sub?: Subscription;
  private authSub?: Subscription;

  constructor(
    private surveyService: SurveyService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authSub = this.authService.currentUser.pipe(
      filter(user => user !== null)
    ).subscribe(user => {
      if (user?.uid) {
        if (this.sub) this.sub.unsubscribe();
        this.sub = this.surveyService.getMySurveys(user.uid).subscribe(data => {
          this.surveys = data;
          this.loading = false;
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.authSub?.unsubscribe();
  }

  get uniqueGames(): number {
    return new Set(this.surveys.map(s => s.favoriteGame.toLowerCase())).size;
  }

  get uniqueLocations(): number {
    return new Set(this.surveys.map(s => s.campusLocation)).size;
  }

  openDetail(id: string) {
    this.router.navigate(['/survey-detail', id]);
  }
}