import { ApplicationConfig,importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageSnackbarComponent } from './shared/message-snackbar/message-snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(appRoutes),
    importProvidersFrom(
      BrowserAnimationsModule,
      MessageSnackbarComponent ,
      MatSnackBar
    )
  ]
};
