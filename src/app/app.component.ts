import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { finalize } from 'rxjs';
import { FaceDetectionHistoryDto, FaceDetectionInputDto } from './shared/features/face-detection/dtos/face-detection.dto';
import { FaceDetectionService } from './shared/features/face-detection/services/face-detection.service';
import { TruncateDecimalsPipe } from './shared/pipes/truncate-decimals.pipe';
import { FaceDetectionHistoryComponent } from './shared/features/face-detection/components/history/face-detection-history.component';
import { FaceDetectionViewerComponent } from './shared/features/face-detection/components/viewer/face-detection-viewer.component';
import { FaceDetectionHistoryListComponent } from './shared/features/face-detection/components/history-list/face-detection-history-list.component';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FaceDetectionEffects } from './shared/features/face-detection/stores/face-detection.effects';
import { FaceDetectionState, selectHistories } from './shared/features/face-detection/stores/face-detection.state';
import { FaceDetectionActions, selectHistory, updateHistoryImage } from './shared/features/face-detection/stores/face-detection.actions';

@UntilDestroy()
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TruncateDecimalsPipe,
    CommonModule,
    NgbAlertModule,
    FaceDetectionViewerComponent,
    FaceDetectionHistoryListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @ViewChild('viewer') viewer!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private faceDetectionService = inject(FaceDetectionService);
  private cdr = inject(ChangeDetectorRef);
  private store = inject(Store<FaceDetectionState>)

  faceInput: FaceDetectionInputDto | null = null;
  errorMsg: string | null = null;
  loading = false;
  currentHistory: FaceDetectionHistoryDto | null = null;
  histories$ = this.store.select(selectHistories);
  
  onFileSelected(event: Event): void {
    this.faceInput = null;
    this.currentHistory = null;
    this.errorMsg = null;

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.faceInput = {
          fileName: file.name,
          base64Image: reader.result as string
        };

        console.log(
          '[this.faceInput.base64Image]', this.faceInput.base64Image
        );
        this.cdr.markForCheck();
      };

      reader.readAsDataURL(file);
    }
  }

  scan(): void {
    this.loading = true;
    this.faceDetectionService.detectFace(this.faceInput!.base64Image)
      .pipe(
        finalize(
          () => {
            this.loading = false;
            this.cdr.markForCheck();
          }
        ),
        untilDestroyed(this)
      )
      .subscribe(
        {
          next: res => {
            console.log('[res]', res);

            if (res.results.length == 1) {
              this.currentHistory = {
                id: Date.now().toString(),
                name: this.faceInput!.fileName,
                base64Image: this.faceInput!.base64Image,
                faceDetectionResult: res.results[0]
              };
              this.store.dispatch(FaceDetectionActions.addHistory({payload: this.currentHistory!}));
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
      );
  }

  historySelected(historyDto: FaceDetectionHistoryDto): void {
    this.fileInput.nativeElement.value = "";
    this.faceInput = null;
    this.errorMsg = null;

    this.currentHistory = historyDto;

    this.viewer.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  updateLatestScannedImageUrl(ndx: number, base64: string): void {
    console.log(
      '[setScannedImageUrl]', base64
    );

    if (this.faceInput) { //only update on new file
      this.store.dispatch(updateHistoryImage({ndx, base64}));
    }
  }
}
