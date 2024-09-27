import { inject, Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { FaceDetectionState } from "./face-detection.state";
import { Store } from "@ngrx/store";
import { FaceDetectionService } from "../services/face-detection.service";

@Injectable()
export class FaceDetectionEffects {
  actions = inject(Actions);
  store = inject(Store<FaceDetectionState>);
  faceDetectionService = inject(FaceDetectionService);
}