import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngrx/store";
import { TruncateDecimalsPipe } from "../../../../shared/pipes/truncate-decimals.pipe";
import { detectFace } from "../../stores/face-detection.actions";
import { selectCurrentHistory, selectFaceInput, selectLoading, selectScanErrorMsg, selectScanSuccessMsg } from "../../stores/face-detection.selectors";
import { FaceDetectionState } from "../../stores/face-detection.state";

@Component({
  selector: 'app-face-detection-viewer',
  standalone: true,
  templateUrl: './face-detection-viewer.component.html',
  imports: [
    CommonModule,
    NgbAlertModule,
    TruncateDecimalsPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaceDetectionViewerComponent {
  private store = inject(Store<FaceDetectionState>);

  loading = toSignal(this.store.select(selectLoading));
  currentHistory = toSignal(this.store.select(selectCurrentHistory));
  faceInput = toSignal(this.store.select(selectFaceInput))
  successMsg = toSignal(this.store.select(selectScanSuccessMsg));
  errorMsg = toSignal(this.store.select(selectScanErrorMsg));

  scan(): void {
    this.store.dispatch(detectFace());
  }
}