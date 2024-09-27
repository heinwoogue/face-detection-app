import { createReducer, on } from "@ngrx/store";
import { FaceDetectionState } from "./face-detection.state";
import { FaceDetectionActions } from "./face-detection.actions";

const initialState: FaceDetectionState = {
  histories: [],
  currentHistory: null,
};

export const faceDetectionReducer = createReducer(
  initialState,
  on(FaceDetectionActions.loadHistories, (state) => ({...state})),
  on(FaceDetectionActions.addHistory, (state, {payload: newHistory}) => ({
    ...state,
    histories: [
      ...state.histories,
      newHistory
    ]
  })),
  on(FaceDetectionActions.updateHistoryImage, (state, {ndx, base64}) => ({
    ...state,
    histories: state.histories.map(
      (history, i) => {
        if(i == ndx){
          return {
            ...history,
            base64Image: base64
          }
        }
        return history;
      }
    )
  })),
  on(FaceDetectionActions.selectHistory, (state, {payload: selectedHistory}) => ({
    ...state,
    currentHistory: selectedHistory ? {...selectedHistory}: null
  })),
);