import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { GameInfo } from '../models/survey.model';

@Injectable({ providedIn: 'root' })
export class GameApiService {
  private rawgBase = 'https://api.rawg.io/api';
  private freeToGameBase = 'https://www.freetogame.com/api';

  constructor(private http: HttpClient) {}

  searchGame(gameName: string): Observable<GameInfo | null> {
    const key = environment.rawgApiKey;
    const url = `${this.rawgBase}/games?key=${key}&search=${encodeURIComponent(gameName)}&page_size=1`;

    return this.http.get<any>(url).pipe(
      map(res => {
        if (res.results && res.results.length > 0) {
          const g = res.results[0];
          return {
            id: g.id,
            name: g.name,
            backgroundImage: g.background_image || '',
            genres: g.genres?.map((x: any) => x.name).join(', ') || 'N/A',
            platforms: g.platforms?.map((x: any) => x.platform.name).join(', ') || 'N/A',
            rating: g.rating || 0,
            description: `Rating: ${g.rating}/5`,
            metacritic: g.metacritic
          } as GameInfo;
        }
        return null;
      }),
      switchMap(result => {
        if (result) return of(result);
        return this.searchFreeToGame(gameName);
      }),
      catchError(() => this.searchFreeToGame(gameName))
    );
  }

  private searchFreeToGame(gameName: string): Observable<GameInfo | null> {
    return this.http.get<any[]>(`${this.freeToGameBase}/games`).pipe(
      map(games => {
        if (!games) return null;
        const found = games.find(g =>
          g.title.toLowerCase().includes(gameName.toLowerCase())
        );
        if (!found) return null;
        return {
          id: found.id,
          name: found.title,
          backgroundImage: found.thumbnail,
          genres: found.genre || 'N/A',
          platforms: found.platform || 'N/A',
          rating: 0,
          description: found.short_description || '',
        } as GameInfo;
      }),
      catchError(() => of(null))
    );
  }
}