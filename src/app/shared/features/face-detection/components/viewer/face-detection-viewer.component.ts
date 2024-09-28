import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TruncateDecimalsPipe } from "../../../../pipes/truncate-decimals.pipe";
import { toSignal } from "@angular/core/rxjs-interop";
import { selectLoading, selectCurrentHistory, selectFaceInput, selectScanSuccessMsg, selectScanErrorMsg } from "../../stores/face-detection.selectors";
import { Store } from "@ngrx/store";
import { FaceDetectionState } from "../../stores/face-detection.state";
import { detectFace, updateHistoryImage } from "../../stores/face-detection.actions";
import { FaceDetectionDrawerComponent } from "../drawer/face-detection-drawer.component";
import { CommonModule } from "@angular/common";
import { NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-face-detection-viewer',
  standalone: true,
  templateUrl: './face-detection-viewer.component.html',
  imports: [
    CommonModule,
    NgbAlertModule,
    TruncateDecimalsPipe,
    FaceDetectionDrawerComponent,
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
    if (this.faceInput()) {
      this.store.dispatch(detectFace());
    }
  }

  updateCurrentHistoryImageUrl(base64: string): void {
    if (this.faceInput() && this.currentHistory()) {
      this.store.dispatch(updateHistoryImage({ id: this.currentHistory()!.id, base64 }));
    }
  }
}