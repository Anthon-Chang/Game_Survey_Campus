import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({ providedIn: 'root' })
export class GeolocationService {

  async getCurrentPosition(): Promise<{ latitude: number; longitude: number } | null> {
    try {
      const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
      return {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      };
    } catch (e) {
      return null;
    }
  }
}