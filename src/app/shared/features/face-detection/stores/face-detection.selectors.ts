import { FaceDetectionState } from "./face-detection.state";

export const selectHistory = (state: FaceDetectionState) => state.histories;
export const selectCurrentHistory = (state: FaceDetectionState) => state.currentHistory;