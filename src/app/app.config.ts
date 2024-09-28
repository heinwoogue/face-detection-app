import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { FaceDetectionEffects } from './features/face-detection/stores/face-detection.effects';
import { faceDetectionReducer } from './features/face-detection/stores/face-detection.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(
      { faceDetections: faceDetectionReducer }
    ),
    provideEffects([FaceDetectionEffects]),
    importProvidersFrom(StoreDevtoolsModule.instrument())
  ]
};
