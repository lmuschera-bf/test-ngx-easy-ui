import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { EasyTheme, EasyThemeService, ProvidedThemeName, getEasyTheme } from '@ngx-easy-ui/themes';

@Component({
  selector: 'tematizza',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './tematizza.component.html',
  styleUrl: './tematizza.component.scss'
})
export class TematizzaComponent {

  public readonly temi: EasyTheme[] = Object.entries(ProvidedThemeName).map(entry => getEasyTheme(entry[1]));
  private readonly easyThemeService: EasyThemeService = inject(EasyThemeService);

  public cambiaTema(tema: EasyTheme): void {
    this.easyThemeService.setTheme(tema);
  }

}