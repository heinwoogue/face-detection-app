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
export const selectScanErrorMsg = createSelector(
  selectFaceDetections,
  (state: FaceDetectionState) => state.scanErrorMsg
);
export const selectScanSuccessMsg = createSelector(
  selectFaceDetections,
  (state: FaceDetectionState) => state.scanSuccessMsg
);
export const selectLoading = createSelector(
  selectFaceDetections,
  (state: FaceDetectionState) => state.loading
);