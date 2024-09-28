import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { FaceDetectionHistoryListComponent } from './features/face-detection/components/history-list/face-detection-history-list.component';
import { FaceDetectionUploadComponent } from "./features/face-detection/components/upload/face-detection-upload.component";
import { FaceDetectionViewerComponent } from "./features/face-detection/components/viewer/face-detection-viewer.component";
import { selectCurrentHistory } from './features/face-detection/stores/face-detection.selectors';
import { FaceDetectionState } from './features/face-detection/stores/face-detection.state';

@UntilDestroy()
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FaceDetectionHistoryListComponent,
    FaceDetectionUploadComponent,
    FaceDetectionViewerComponent
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
  @ViewChild('viewer') viewer!: ElementRef;

  private store = inject(Store<FaceDetectionState>);

  currentHistory = toSignal(this.store.select(selectCurrentHistory));

  ngAfterViewInit(): void {
    this.store.select(selectCurrentHistory).pipe(
      tap(
        (currentHistory) => {
          if (currentHistory) {
            this.viewer.nativeElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      ),
      untilDestroyed(this),
    ).subscribe();
  }
}
