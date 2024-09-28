import { createAction, props } from "@ngrx/store";
import { FaceDetectionHistoryDto, FaceDetectionInputDto } from "../dtos/face-detection.dto";

const FACE_DETECTION_KEY = '[Face Detection]';

export const loadHistories = createAction(
  `${FACE_DETECTION_KEY} load histories`
);

export const addHistory = createAction(
  `${FACE_DETECTION_KEY} add history`,
  props<{ newHistory: FaceDetectionHistoryDto }>()
);

export const updateHistoryImage = createAction(
  `${FACE_DETECTION_KEY} update history image`,
  props<{ id: string, base64: string }>()
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

export const clearFaceInput = createAction(
  `${FACE_DETECTION_KEY} clear face input`,
);

export const setSuccessMsg = createAction(
  `${FACE_DETECTION_KEY} set success msg`,
  props<{ successMsg: string }>()
);

export const setErrorMsg = createAction(
  `${FACE_DETECTION_KEY} set error msg`,
  props<{ errorMsg: string }>()
);

export const clearMsg = createAction(
  `${FACE_DETECTION_KEY} clear error msg`
);

export const detectFace = createAction(
  `${FACE_DETECTION_KEY} detect face`
);

export const clearLoading = createAction(
  `${FACE_DETECTION_KEY} clear loading`
);