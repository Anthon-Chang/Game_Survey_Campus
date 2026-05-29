import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { Survey } from '../../models/survey.model';

@Component({
  selector: 'app-survey-detail',
  templateUrl: './survey-detail.page.html',
  styleUrls: ['./survey-detail.page.scss'],
  standalone: false,
})
export class SurveyDetailPage implements OnInit {
  survey: Survey | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.survey = await this.surveyService.getSurveyById(id);
    }
    this.loading = false;
  }

  openMaps() {
    if (this.survey) {
      const url = `https://www.google.com/maps?q=${this.survey.latitude},${this.survey.longitude}`;
      window.open(url, '_blank');
    }
  }
}