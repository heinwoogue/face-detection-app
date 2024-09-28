import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, finalize, of, switchMap, withLatestFrom } from "rxjs";
import { FaceDetectionService } from "../services/face-detection.service";
import * as FaceDetectionAction from './face-detection.actions';
import { selectFaceInput } from "./face-detection.selectors";
import { FaceDetectionState } from "./face-detection.state";

@Injectable()
export class FaceDetectionEffects {
  actions$ = inject(Actions);
  store = inject(Store<FaceDetectionState>);
  faceDetectionService = inject(FaceDetectionService);

  detectFace$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FaceDetectionAction.detectFace),
      withLatestFrom(this.store.select(selectFaceInput)),
      switchMap(
        ([action, faceInput]) => {
          return this.faceDetectionService.detectFace(faceInput!.base64Image).pipe(
            finalize(
              () => {
                this.store.dispatch(FaceDetectionAction.clearLoading());
              }
            ),
            switchMap(
              (res) => {
                if (res.results.length == 1) {
                  const faceDetectionResult = res.results[0];
                  return this.faceDetectionService.drawFaceBoundingBox(
                    faceInput!.base64Image,
                    faceDetectionResult
                  ).pipe(
                    switchMap((base64ImageWithBoundingBox) => {
                      const currentHistory = {
                        id: Date.now().toString(),
                        name: faceInput!.fileName,
                        base64Image: base64ImageWithBoundingBox,
                        faceDetectionResult: faceDetectionResult
                      };

                      return [
                        FaceDetectionAction.addHistory({ newHistory: currentHistory! }),
                        FaceDetectionAction.selectHistory({ historyDto: currentHistory! }),
                        FaceDetectionAction.setScanSuccessMsg({ successMsg: 'Face successfully scanned.' }),
                      ];
                    }),
                    catchError((error) => {
                      return of(FaceDetectionAction.setScanErrorMsg({ errorMsg: error.message }));
                    })
                  );
                }

                if (res.results.length == 0) {
                  return [FaceDetectionAction.setScanErrorMsg({ errorMsg: "No face detected." })];
                }

                //multiple results
                return [FaceDetectionAction.setScanErrorMsg({ errorMsg: "Multiple faces detected." })];
              }
            ),
            catchError(
              (error) => {
                return of(FaceDetectionAction.setScanErrorMsg({ errorMsg: error.message }));
              }
            ),
          );
        }
      ),
    )
  });
}