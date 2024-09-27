import { createSelector } from "@ngrx/store";
import { AppState } from "../../../state/app.state";
import { FaceDetectionHistoryDto } from "../dtos/face-detection.dto";

export interface FaceDetectionState {
  histories: FaceDetectionHistoryDto[];
  currentHistory: FaceDetectionHistoryDto | null;
}

export const selectFaceDetections = (state: AppState) => state.faceDetections;
export const selectHistories = createSelector(
  selectFaceDetections,
  (state: FaceDetectionState) => state.histories
);