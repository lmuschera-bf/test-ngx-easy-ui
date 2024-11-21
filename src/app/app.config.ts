import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideDateLocale, provideFormFieldAppearance } from '@ngx-easy-ui/components';
import { easyThemeProvider } from '@ngx-easy-ui/themes';
import { routes } from './app.routes';
import { geocallRemoteCall, GeocallRemoteCallType, provideGeocallFixedBasePath } from '@ngx-bofrost/geocall-remote-call';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideFormFieldAppearance('fill'),
    provideDateLocale('en-GB'),
    provideRouter(routes),
    provideAnimations(),
    easyThemeProvider({ defaultTheme: 'BoFrost' }),
    provideClientHydration(withEventReplay()),
    provideGeocallFixedBasePath('http://127.0.0.1:8080/geocallapp'),
    provideHttpClient(withFetch(), withInterceptors([geocallRemoteCall(GeocallRemoteCallType.SESSION_LESS)])),
  ]
};
