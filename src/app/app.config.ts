// updated from @ngx-bofrost/geocallapp
import { mergeApplicationConfig } from '@angular/core';
import { geocallConfig } from './app.config.geocall';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideFormFieldAppearance } from '@ngx-easy-ui/components';
import { routes } from './app.routes';

const config: ApplicationConfig = {
  providers: [
    provideFormFieldAppearance('fill'),
    provideRouter(routes),
    provideAnimations(),
    provideClientHydration(withEventReplay()),
    provideExperimentalZonelessChangeDetection()
  ]
};

export const appConfig = mergeApplicationConfig(config, geocallConfig)