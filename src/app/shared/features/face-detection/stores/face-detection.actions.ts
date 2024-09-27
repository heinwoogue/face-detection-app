import { createAction, props } from "@ngrx/store";
import { FaceDetectionHistoryDto } from "../dtos/face-detection.dto";

const FACE_DETECTION_KEY = '[Face Detection]';

export const loadHistories = createAction(
  `${FACE_DETECTION_KEY} load histories`
);

export const addHistory = createAction(
  `${FACE_DETECTION_KEY} add history`,
  props<{payload: FaceDetectionHistoryDto}>()
);

export const updateHistoryImage = createAction(
  `${FACE_DETECTION_KEY} update history image`,
  props<{ndx: number, base64: string}>()
);

export const selectHistory = createAction(
  `${FACE_DETECTION_KEY} select history`,
  props<{payload: FaceDetectionHistoryDto | null}>()
);
 
export const FaceDetectionActions =  {
  loadHistories,
  addHistory,
  updateHistoryImage,
  selectHistory,
}