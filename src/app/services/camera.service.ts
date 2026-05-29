import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({ providedIn: 'root' })
export class CameraService {

  async takePicture(): Promise<string | null> {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        quality: 30,
        width: 400,
        height: 400
      });
      return photo.base64String || null;
    } catch (e) {
      return null;
    }
  }

  async pickFromGallery(): Promise<string | null> {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos,
        quality: 30,
        width: 400,
        height: 400
      });
      return photo.base64String || null;
    } catch (e) {
      return null;
    }
  }
}