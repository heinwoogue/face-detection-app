import { createReducer, on } from "@ngrx/store";
import * as FaceDetectionActions from "./face-detection.actions";
import { FaceDetectionState } from "./face-detection.state";

const initialState: FaceDetectionState = {
  histories: [],
  selectedHistory: null,
  faceInput: null,
  scanErrorMsg: null,
  scanSuccessMsg: null,
  loading: false,
};

export const faceDetectionReducer = createReducer(
  initialState,
  on(FaceDetectionActions.addHistory, (state, { newHistory }) => ({
    ...state,
    histories: [
      ...state.histories,
      newHistory
    ]
  })),
  on(FaceDetectionActions.selectHistory, (state, { historyDto: selectedHistory }) => ({
    ...state,
    faceInput: null,
    scanSuccessMsg: null,
    scanErrorMsg: null,
    selectedHistory: { ...selectedHistory }
  })),
  on(FaceDetectionActions.clearSelectedHistory, (state) => ({
    ...state,
    selectedHistory: null
  })),
  on(FaceDetectionActions.loadFaceInput, (state, { faceInput }) => ({
    ...state,
    faceInput: { ...faceInput }
  })),
  on(FaceDetectionActions.setScanSuccessMsg, (state, { successMsg }) => ({
    ...state,
    scanSuccessMsg: successMsg,
    scanErrorMsg: null
  })),
  on(FaceDetectionActions.setScanErrorMsg, (state, { errorMsg }) => ({
    ...state,
    scanSuccessMsg: null,
    scanErrorMsg: errorMsg
  })),
  on(FaceDetectionActions.clearScanMsgs, (state) => ({
    ...state,
    scanSuccessMsg: null,
    scanErrorMsg: null
  })),
  on(FaceDetectionActions.detectFace, (state) => ({
    ...state,
    loading: true
  })),
  on(FaceDetectionActions.clearLoading, (state) => ({
    ...state,
    loading: false
  })),
);