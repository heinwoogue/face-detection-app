import { createAction, props } from "@ngrx/store";
import { FaceDetectionHistoryDto, FaceDetectionInputDto } from "../dtos/face-detection.dto";

const FACE_DETECTION_KEY = '[Face Detection]';

export const addHistory = createAction(
  `${FACE_DETECTION_KEY} add history`,
  props<{ newHistory: FaceDetectionHistoryDto }>()
);

export const selectHistory = createAction(
  `${FACE_DETECTION_KEY} select history`,
  props<{ historyDto: FaceDetectionHistoryDto }>()
);

export const clearSelectedHistory = createAction(
  `${FACE_DETECTION_KEY} clear selected history`,
);

export const loadFaceInput = createAction(
  `${FACE_DETECTION_KEY} load face input`,
  props<{ faceInput: FaceDetectionInputDto }>()
);

export const setScanSuccessMsg = createAction(
  `${FACE_DETECTION_KEY} set scan success msg`,
  props<{ successMsg: string }>()
);

export const setScanErrorMsg = createAction(
  `${FACE_DETECTION_KEY} set scan error msg`,
  props<{ errorMsg: string }>()
);

export const clearScanMsgs = createAction(
  `${FACE_DETECTION_KEY} clear scan error msg`
);

export const detectFace = createAction(
  `${FACE_DETECTION_KEY} detect face`
);

export const clearLoading = createAction(
  `${FACE_DETECTION_KEY} clear loading`
);