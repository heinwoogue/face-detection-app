import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { FaceDetectionHistoryDto } from "../../dtos/face-detection.dto";
import { TruncateDecimalsPipe } from "../../../../pipes/truncate-decimals.pipe";

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