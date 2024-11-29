import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { geocallRemoteCall, GeocallRemoteCallType, provideGeocallFixedBasePath } from '@ngx-bofrost/geocall-remote-call';
import { provideDateLocale } from '@ngx-easy-ui/components';
import { easyThemeProvider } from '@ngx-easy-ui/themes';
      
export const geocallConfig: ApplicationConfig = {
  providers: [
    provideDateLocale('en-GB'),
    easyThemeProvider({ defaultTheme: 'BoFrost' }),
    provideGeocallFixedBasePath(import.meta.env['NG_APP_GEOCALL_DEV_PATH']),
    provideHttpClient(withFetch(), withInterceptors([geocallRemoteCall(GeocallRemoteCallType.COOKIES)])),
  ]
};