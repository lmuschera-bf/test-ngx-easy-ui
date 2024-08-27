import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { EasyTheme, EasyThemeService, ProvidedThemeName, ThemeName, getEasyTheme } from '@ngx-easy-ui/themes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule],
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
