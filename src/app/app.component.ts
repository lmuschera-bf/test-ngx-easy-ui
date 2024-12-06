import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { EasyButtonComponent } from '@ngx-easy-ui/components/easy-ui-button';
import { EasyMenuModule } from '@ngx-easy-ui/components/easy-ui-menu';
import { EasyTheme, EasyThemeService, ProvidedThemeName, ThemeName, getEasyTheme } from '@ngx-easy-ui/themes';
import { EasyToolbarModule } from '@ngx-easy-ui/components/easy-ui-toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EasyToolbarModule, EasyMenuModule, EasyButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test-ngx-easy-ui';

  public readonly temi: EasyTheme[] = [getEasyTheme('BoFrost'), ...Object.entries(ProvidedThemeName).map(entry => getEasyTheme(entry[1]))];
  private readonly easyThemeService: EasyThemeService = inject(EasyThemeService);

  private readonly router: Router = inject(Router);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  public current: ThemeName | undefined = this.easyThemeService.current();

  public cambiaTema(tema: EasyTheme): void {
    this.easyThemeService.setTheme(tema);
    this.current = tema.name;
  }

  public to(segment: string): void {
    this.router.navigate([segment], { relativeTo: this.activatedRoute });
  }
}
