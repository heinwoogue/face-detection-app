import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { FaceDetectionHistoryDto } from "../../dtos/face-detection.dto";
import { CommonModule } from "@angular/common";
import { FaceDetectionHistoryComponent } from "../history/face-detection-history.component";

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
  @Input()
  histories!: FaceDetectionHistoryDto[];

  @Output()
  historySelected = new EventEmitter<FaceDetectionHistoryDto>;
}