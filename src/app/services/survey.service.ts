import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, where, orderBy, doc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Survey } from '../models/survey.model';

@Injectable({ providedIn: 'root' })
export class SurveyService {

  constructor(private firestore: Firestore) {}

  async saveSurvey(survey: Survey, base64Photo: string): Promise<string> {
    // Guarda sin foto primero para verificar conectividad
    const surveyToSave = {
      alias: survey.alias,
      ageRange: survey.ageRange,
      role: survey.role,
      favoriteGame: survey.favoriteGame,
      platform: survey.platform,
      genre: survey.genre,
      comment: survey.comment || '',
      campusLocation: survey.campusLocation,
      latitude: survey.latitude,
      longitude: survey.longitude,
      userId: survey.userId,
      userEmail: survey.userEmail,
      timestamp: Date.now(),
      gameInfo: survey.gameInfo || null,
      photoUrl: base64Photo ? `data:image/jpeg;base64,${base64Photo}` : ''
    };

    const surveysRef = collection(this.firestore, 'surveys');
    const docRef = await addDoc(surveysRef, surveyToSave);
    return docRef.id;
  }

  getMySurveys(uid: string): Observable<Survey[]> {
    const surveysRef = collection(this.firestore, 'surveys');
    const q = query(
      surveysRef,
      where('userId', '==', uid),
      orderBy('timestamp', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Survey[]>;
  }

  getAllSurveys(): Observable<Survey[]> {
    const surveysRef = collection(this.firestore, 'surveys');
    const q = query(surveysRef, orderBy('timestamp', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Survey[]>;
  }

  async getSurveyById(id: string): Promise<Survey | null> {
    const docRef = doc(this.firestore, 'surveys', id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as Survey;
    }
    return null;
  }
}