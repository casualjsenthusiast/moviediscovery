import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app/app.component';
import { AppConfigService } from './app/services/app-config.service';
import { firstValueFrom } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { MovieService } from './app/services/movie.service';

/**
 * Initializes app configuration using AppConfigService.
 * @param appConfig The AppConfigService instance.
 * @returns Function that returns a Promise resolving after config load.
 */
export function initializeApp(appConfig: AppConfigService) {
  return () => firstValueFrom(appConfig.loadConfig());
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), 
    provideAnimations(),
    provideHttpClient(),
    AppConfigService,
    MovieService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfigService],
      multi: true
    }
  ]
});
