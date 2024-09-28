import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { TruncateDecimalsPipe } from "../../../../shared/pipes/truncate-decimals.pipe";
import { FaceDetectionHistoryDto } from "../../dtos/face-detection.dto";

@Component({
  selector: 'app-face-detection-history',
  standalone: true,
  templateUrl: './face-detection-history.component.html',
  imports: [TruncateDecimalsPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaceDetectionHistoryComponent {
  @Input()
  history!: FaceDetectionHistoryDto;
}