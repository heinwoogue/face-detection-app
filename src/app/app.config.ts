import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore, StoreModule } from '@ngrx/store';
import { faceDetectionReducer } from './shared/features/face-detection/stores/face-detection.reducers';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { FaceDetectionEffects } from './shared/features/face-detection/stores/face-detection.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(),
    provideStore(
      {faceDetections: faceDetectionReducer}
    ),
    provideEffects([FaceDetectionEffects]),
    importProvidersFrom(StoreDevtoolsModule.instrument())
  ]
};
