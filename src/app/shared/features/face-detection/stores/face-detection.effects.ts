import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FaceDetectionState } from "./face-detection.state";
import { Store } from "@ngrx/store";
import { FaceDetectionService } from "../services/face-detection.service";
import { catchError, finalize, of, switchMap, withLatestFrom } from "rxjs";
import * as FaceDetectionAction from './face-detection.actions';
import { selectFaceInput } from "./face-detection.selectors";

@Injectable()
export class FaceDetectionEffects {
  actions$ = inject(Actions);
  store = inject(Store<FaceDetectionState>);
  faceDetectionService = inject(FaceDetectionService);

  detectFace$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(FaceDetectionAction.detectFace),
      withLatestFrom(this.store.select(selectFaceInput)),
      switchMap(
        ([action, faceInput]) => {
          return this.faceDetectionService.detectFace(faceInput!.base64Image).pipe(
            finalize(
              ()=> {
                console.log('[finalize]'),
                this.store.dispatch(FaceDetectionAction.clearLoading());
              }
            ),
            switchMap(
              (res) => {
                if (res.results.length == 1) {
                  const currentHistory = {
                    id: Date.now().toString(),
                    name: faceInput!.fileName,
                    base64Image: faceInput!.base64Image,
                    faceDetectionResult: res.results[0]
                  };
                  return [
                    FaceDetectionAction.addHistory({payload: currentHistory!}),
                    FaceDetectionAction.selectHistory({payload: currentHistory})
                  ];
                }
    
                if (res.results.length == 0) {
                  return [FaceDetectionAction.setErrorMsg({errorMsg: "No face detected"})];
                }

                //multiple results
                return [FaceDetectionAction.setErrorMsg({errorMsg: "Multiple faces detected"})];
              }
            ),
            catchError(
              (error)=>{
                return of(FaceDetectionAction.setErrorMsg({errorMsg: error.message}));
              }
            ),
          );
        }
      ),
    )
  });
}