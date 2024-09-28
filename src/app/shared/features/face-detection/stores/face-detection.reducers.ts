import { createReducer, on } from "@ngrx/store";
import * as FaceDetectionActions from "./face-detection.actions";
import { FaceDetectionState } from "./face-detection.state";

const initialState: FaceDetectionState = {
  histories: [],
  selectedHistory: null,
  faceInput: null,
  errorMsg: null,
  loading: false,
};

export const faceDetectionReducer = createReducer(
  initialState,
  on(FaceDetectionActions.loadHistories, (state) => ({ ...state })),
  on(FaceDetectionActions.addHistory, (state, { payload: newHistory }) => ({
    ...state,
    histories: [
      ...state.histories,
      newHistory
    ]
  })),
  on(FaceDetectionActions.updateHistoryImage, (state, { id, base64 }) => ({
    ...state,
    histories: state.histories.map(
      (history) => {
        if (history.id == id) {
          return {
            ...history,
            base64Image: base64
          }
        }
        return history;
      }
    )
  })),
  on(FaceDetectionActions.selectHistory, (state, { payload: selectedHistory }) => ({
    ...state,
    selectedHistory: {...selectedHistory}
  })),
  on(FaceDetectionActions.clearSelectedHistory, (state) => ({
    ...state,
    selectedHistory: null
  })),
  on(FaceDetectionActions.loadFaceInput, (state, { payload: faceInput }) => ({
    ...state,
    faceInput: {...faceInput}
  })),
  on(FaceDetectionActions.clearFaceInput, (state) => ({
    ...state,
    faceInput: null
  })),
  on(FaceDetectionActions.setErrorMsg, (state, {errorMsg}) => ({
    ...state,
    errorMsg
  })),
  on(FaceDetectionActions.clearErrorMsg, (state) => ({
    ...state,
    errorMsg: null
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