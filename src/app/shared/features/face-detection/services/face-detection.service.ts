import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FaceDetectionResult, FaceDetectionResults } from '../models/face-detection.model';

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
}
