import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input } from "@angular/core";
import { FaceDetectionHistoryDto } from "../../dtos/face-detection.dto";
import { CommonModule } from "@angular/common";
import { FaceDetectionHistoryComponent } from "../history/face-detection-history.component";
import { Store } from "@ngrx/store";
import { FaceDetectionState } from "../../stores/face-detection.state";
import { selectHistory } from "../../stores/face-detection.actions";
import { toSignal } from "@angular/core/rxjs-interop";
import { selectHistories } from "../../stores/face-detection.selectors";

@Component({
  selector: 'app-face-detection-history-list',
  standalone: true,
  templateUrl: './face-detection-history-list.component.html',
  imports: [
    CommonModule,
    FaceDetectionHistoryComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaceDetectionHistoryListComponent{
  private store = inject(Store<FaceDetectionState>);

  histories = toSignal(this.store.select(selectHistories));

  selectHistory(historyDto: FaceDetectionHistoryDto): void {
    this.store.dispatch(selectHistory({ historyDto }));
  }

  trackById(index: number, item: FaceDetectionHistoryDto): string {
    return item.id;
  }
}