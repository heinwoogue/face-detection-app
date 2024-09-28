import { createSelector } from "@ngrx/store";
import { AppState } from "../../../state/app.state";
import { FaceDetectionHistoryDto, FaceDetectionInputDto } from "../dtos/face-detection.dto";

export interface FaceDetectionState {
  histories: FaceDetectionHistoryDto[];
  selectedHistory: FaceDetectionHistoryDto | null;
  faceInput: FaceDetectionInputDto | null;
  errorMsg: string | null;
  loading: boolean;
}