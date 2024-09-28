import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { FaceDetectionHistoryDto } from "../../dtos/face-detection.dto";

@Component({
  selector: 'app-face-detection-history',
  standalone: true,
  templateUrl: './face-detection-history.component.html',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaceDetectionHistoryComponent {
  @Input()
  history!: FaceDetectionHistoryDto;
}