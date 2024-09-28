import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FaceDetectionResult, FaceDetectionResults } from '../models/face-detection.model';
import Konva from 'konva';

@Injectable({
  providedIn: 'root'
})
export class FaceDetectionService {

  private static readonly apiUrl = '/face-detection-api';

  private httpClient = inject(HttpClient);

  detectFace(sourceUrl: string): Observable<FaceDetectionResults> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      sourceUrl
    };

    return this.httpClient.post<FaceDetectionResults>(FaceDetectionService.apiUrl, body, { headers });
  }

  drawFaceBoundingBox(imageUrl: string, result: FaceDetectionResult): Observable<string> {
    return new Observable<string>((observer) => {
      const imageObj = new Image();

      imageObj.onload = () => {
        const stage = new Konva.Stage({
          container: document.createElement('div'), // Temporary container to hold the Konva stage
          width: imageObj.width,
          height: imageObj.height,
        });

        const layer = new Konva.Layer();
        stage.add(layer);

        const img = new Konva.Image({
          x: 0,
          y: 0,
          image: imageObj,
          width: imageObj.width,
          height: imageObj.height,
        });

        layer.add(img);
        this.drawBoundingBox(layer, result);
        layer.draw();

        const base64Image = stage.toDataURL();
        observer.next(base64Image);
        observer.complete();
      };

      imageObj.onerror = (err) => {
        observer.error('Error loading image');
      };

      imageObj.src = imageUrl;
    });
  }

  private drawBoundingBox(layer: Konva.Layer, result: FaceDetectionResult) {
    const { age, gender } = result;
    const { left, top, right, bottom } = result.rectangle;

    const rect = new Konva.Rect({
      x: left,
      y: top,
      width: right - left,
      height: bottom - top,
      stroke: 'red',
      strokeWidth: 2,
    });

    const ageX = rect.x();
    const ageY = rect.y() + rect.height() + 2;

    const ageText = new Konva.Text({
      x: ageX + 1,
      y: ageY + 1,
      text: `Age: ${age}`,
      fontSize: 16,
      fill: 'black',
    });

    const ageBackground = new Konva.Rect({
      x: ageX,
      y: ageY,
      width: ageText.width() + 2,
      height: ageText.height() + 2,
      fill: 'white',
      cornerRadius: 4,
    });

    const genderX = rect.x();
    const genderY = ageText.y() + ageText.height() + 2;

    const genderText = new Konva.Text({
      x: genderX + 1,
      y: genderY + 3,
      text: `Gender: ${gender}`,
      fontSize: 16,
      fill: 'black',
    });

    const genderBackground = new Konva.Rect({
      x: genderX,
      y: genderY,
      width: genderText.width() + 2,
      height: genderText.height() + 2,
      fill: 'white',
      cornerRadius: 4,
    });

    layer.add(rect);
    layer.add(ageBackground);
    layer.add(ageText);
    layer.add(genderBackground);
    layer.add(genderText);
    layer.draw();
  }
}
