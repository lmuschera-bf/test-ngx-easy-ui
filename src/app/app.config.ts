import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { provideDateLocale, provideFormFieldAppearance } from '@ngx-easy-ui/components';
import { easyThemeProvider } from '@ngx-easy-ui/themes';
import { routes } from './app.routes';

// en-GB
export const appConfig: ApplicationConfig = {
  providers: [provideExperimentalZonelessChangeDetection(), provideFormFieldAppearance('fill'), provideDateLocale('en-GB'), provideRouter(routes), provideAnimations(), easyThemeProvider({
    defaultTheme: 'BoFrost'
  })]
};
