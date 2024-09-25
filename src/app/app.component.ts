import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Result } from './face-detection/models/face-detection.model';
import { FaceDetectionService } from './face-detection/services/face-detection.service';
import { GalleryComponent } from "./gallery/gallery.component";
import { KonvaTestComponent } from "./konva-test/konva-test.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NgbAlertModule,
    GalleryComponent,
    KonvaTestComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'face-detection-app';

  base64Image: string | null = null;
  boundingBox: Result | null = null;

  errorMsg: string | null = null;

  private faceDetectionService = inject(FaceDetectionService);

  onFileSelected(event: Event): void {
    //reset
    this.base64Image = null;
    this.boundingBox = null;
    this.errorMsg = null;

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.base64Image = reader.result as string;

        console.log(
          '[this.base64Image]', this.base64Image
        );
      };

      reader.readAsDataURL(file);
    }
  }

  scan(): void {
    this.faceDetectionService.detectFace(this.base64Image!).subscribe(
      {
        next: res => {
          console.log('[res]', res);

          if (res.results.length == 1) {
            this.boundingBox = res.results[0];
            return;
          }

          if (res.results.length == 0) {
            this.errorMsg = "No face detected";
          } else if (res.results.length > 1) {
            this.errorMsg = "Multiple faces detected"
          }
        },
        error: error => {
          this.errorMsg = error.message;

          console.log('[error]', error);
        }
      }
    )
  }
}
