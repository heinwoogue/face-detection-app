import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FaceDetectionViewerComponent } from "./face-detection/components/viewer/face-detection-viewer.component";
import { Result } from './face-detection/models/face-detection.model';
import { FaceDetectionService } from './face-detection/services/face-detection.service';

type History = {
  name: string,
  base64Image: string,
  boundingBox: Result
};

@UntilDestroy()
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NgbAlertModule,
    FaceDetectionViewerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  @ViewChild('viewer') viewer!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  fileName: string | null = null;
  base64Image: string | null = null;
  boundingBox: Result | null = null;
  errorMsg: string | null = null;
  loading = false;
  history: History[] = []

  private faceDetectionService = inject(FaceDetectionService);
  private cdr = inject(ChangeDetectorRef);

  onFileSelected(event: Event): void {
    //reset
    this.fileName = null;
    this.base64Image = null;
    this.boundingBox = null;
    this.errorMsg = null;

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName = file.name;

      const reader = new FileReader();

      reader.onload = () => {
        this.base64Image = reader.result as string;

        console.log(
          '[this.base64Image]', this.base64Image
        );
        this.cdr.markForCheck();
      };

      reader.readAsDataURL(file);
    }
  }

  scan(): void {
    this.loading = true;
    this.faceDetectionService.detectFace(this.base64Image!)
      .pipe(untilDestroyed(this))
      .subscribe(
        {
          next: res => {
            console.log('[res]', res);

            if (res.results.length == 1) {
              this.boundingBox = res.results[0];

              this.history.push(
                {
                  name: this.fileName!,
                  base64Image: this.base64Image!,
                  boundingBox: this.boundingBox!
                }
              );

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
          },
          complete: () => {
            this.loading = false;
            this.cdr.markForCheck();
          }
        }
      );
  }

  historySelected(his: History): void {
    this.fileInput.nativeElement.value = "";

    this.fileName = null;
    this.base64Image = his.base64Image;
    this.boundingBox = his.boundingBox;
    this.errorMsg = null;

    this.viewer.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
