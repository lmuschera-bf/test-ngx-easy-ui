import { Component, inject } from '@angular/core';
import { EasyButtonComponent } from '@ngx-easy-ui/components/easy-ui-button';
import { EasyTheme, EasyThemeService, ProvidedThemeName, getEasyTheme } from '@ngx-easy-ui/themes';

@Component({
  selector: 'tematizza',
  standalone: true,
  imports: [EasyButtonComponent],
  templateUrl: './tematizza.component.html',
  styleUrl: './tematizza.component.scss'
})
export default class TematizzaComponent {

  public readonly temi: EasyTheme[] = Object.entries(ProvidedThemeName).map(entry => getEasyTheme(entry[1]));
  private readonly easyThemeService: EasyThemeService = inject(EasyThemeService);

  public cambiaTema(tema: EasyTheme): void {
    this.easyThemeService.setTheme(tema);
  }

}