import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { FaceDetectionHistoryListComponent } from './shared/features/face-detection/components/history-list/face-detection-history-list.component';
import { FaceDetectionUploadComponent } from "./shared/features/face-detection/components/upload/face-detection-upload.component";
import { selectCurrentHistory, selectHistories } from './shared/features/face-detection/stores/face-detection.selectors';
import { FaceDetectionState } from './shared/features/face-detection/stores/face-detection.state';
import { FaceDetectionViewerComponent } from "./shared/features/face-detection/components/viewer/face-detection-viewer.component";
import { tap } from 'rxjs/operators';

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
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit{
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
