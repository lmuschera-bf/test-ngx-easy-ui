import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { provideDateLocale, provideFormFieldAppearance } from '@ngx-easy-ui/components';
import { easyThemeProvider } from '@ngx-easy-ui/themes';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

// en-GB
export const appConfig: ApplicationConfig = {
  providers: [provideExperimentalZonelessChangeDetection(), provideFormFieldAppearance('fill'), provideDateLocale('en-GB'), provideRouter(routes)
    , provideAnimations(), easyThemeProvider({
      defaultTheme: 'BoFrost'
    }), provideClientHydration(
      withEventReplay(), // use hydration with NG 18 event replay
    )]
};
