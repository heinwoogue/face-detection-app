import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FaceDetectionRectangle, FaceDetectionResult, FaceDetectionResults } from '../models/face-detection.model';
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

  drawFaceBoundingBox(imageUrl: string, rectangle: FaceDetectionRectangle): Observable<string> {
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
        this.drawBoundingBox(layer, rectangle);
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

  private drawBoundingBox(layer: Konva.Layer, rectangle: FaceDetectionRectangle) {
    const { left, top, right, bottom } = rectangle;

    const rect = new Konva.Rect({
      x: left,
      y: top,
      width: right - left,
      height: bottom - top,
      stroke: 'red',
      strokeWidth: 2,
    });

    layer.add(rect);
    layer.draw();
  }
}
