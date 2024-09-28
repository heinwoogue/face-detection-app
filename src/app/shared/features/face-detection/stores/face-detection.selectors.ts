import { createSelector } from "@ngrx/store";
import { AppState } from "../../../state/app.state";
import { FaceDetectionState } from "./face-detection.state";

export const selectFaceDetections = (state: AppState) => state.faceDetections;
export const selectHistories = createSelector(
  selectFaceDetections,
  (state: FaceDetectionState) => state.histories
);
export const selectCurrentHistory = createSelector(
  selectFaceDetections,
  (state: FaceDetectionState) => state.selectedHistory
);
export const selectFaceInput = createSelector(
  selectFaceDetections,
  (state: FaceDetectionState) => state.faceInput
);
export const selectErrorMsg = createSelector(
  selectFaceDetections,
  (state: FaceDetectionState) => state.errorMsg
);
export const selectLoading = createSelector(
  selectFaceDetections,
  (state: FaceDetectionState) => state.loading
);