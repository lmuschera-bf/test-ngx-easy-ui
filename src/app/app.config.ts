import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { provideDateLocale } from '@ngx-easy-ui/components';
import { easyThemeProvider } from '@ngx-easy-ui/themes';
import { routes } from './app.routes';

// en-GB
export const appConfig: ApplicationConfig = {
  providers: [provideDateLocale('en-GB'), provideRouter(routes), provideAnimations(), easyThemeProvider({
    defaultTheme: 'BoFrost'
  })]
};
