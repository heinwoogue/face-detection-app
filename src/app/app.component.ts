import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { finalize } from 'rxjs';
import { FaceDetectionHistoryDto, FaceDetectionInputDto } from './shared/features/face-detection/dtos/face-detection.dto';
import { FaceDetectionService } from './shared/features/face-detection/services/face-detection.service';
import { TruncateDecimalsPipe } from './shared/pipes/truncate-decimals.pipe';
import { FaceDetectionViewerComponent } from './shared/features/face-detection/components/viewer/face-detection-viewer.component';
import { FaceDetectionHistoryListComponent } from './shared/features/face-detection/components/history-list/face-detection-history-list.component';
import { Store } from '@ngrx/store';
import { FaceDetectionState} from './shared/features/face-detection/stores/face-detection.state';
import { addHistory, clearErrorMsg, clearFaceInput, clearSelectedHistory, detectFace, loadFaceInput, selectHistory, setErrorMsg, updateHistoryImage } from './shared/features/face-detection/stores/face-detection.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectCurrentHistory, selectErrorMsg, selectFaceInput, selectHistories, selectLoading } from './shared/features/face-detection/stores/face-detection.selectors';

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

  private cdr = inject(ChangeDetectorRef);
  private store = inject(Store<FaceDetectionState>)

  loading = toSignal(this.store.select(selectLoading));
  currentHistory = toSignal(this.store.select(selectCurrentHistory));
  faceInput = toSignal(this.store.select(selectFaceInput))
  errorMsg = toSignal(this.store.select(selectErrorMsg));
  histories = toSignal(this.store.select(selectHistories));
  
  onFileSelected(event: Event): void {
    this.store.dispatch(clearFaceInput());
    this.store.dispatch(clearSelectedHistory());
    this.store.dispatch(clearErrorMsg())

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const faceInput = {
          fileName: file.name,
          base64Image: reader.result as string
        };

        this.store.dispatch(loadFaceInput({payload: faceInput}))

        console.log(
          '[this.faceInput.base64Image]', faceInput.base64Image
        );
        this.cdr.markForCheck();
      };

      reader.readAsDataURL(file);
    }
  }

  scan(): void {
    if(this.faceInput()){
      this.store.dispatch(detectFace());
    }
  }

  historySelected(historyDto: FaceDetectionHistoryDto): void {
    this.fileInput.nativeElement.value = "";
    this.store.dispatch(clearFaceInput());
    this.store.dispatch(clearErrorMsg());

    this.store.dispatch(selectHistory({payload: historyDto}));

    this.viewer.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  updateCurrentHistoryImageUrl(base64: string): void {
    console.log(
      '[updateCurrentHistoryImageUrl]', base64
    );

    if (this.faceInput() && this.currentHistory()) {
      this.store.dispatch(updateHistoryImage({id: this.currentHistory()!.id, base64}));
    }
  }
}
