import { JsonPipe } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DimensionTemplates, EasyCheckModule, EasyControlModule, EasyFormComponent, EasyFormModule, EasyInputModule, EasySelectModule, EasySelectOptionDirective, EasyTemporalModule, GridModule, GridTemplate, PANEL_CONTEXT, PANEL_MANAGER, PanelContext, PanelManager, SelectController, TipoBreakPoint, providePanelContext, providePanelManager } from '@ngx-easy-ui/components';
import { EasyButtonComponent } from '../test-bottone/easy-button/easy-button.component';
import { ProvaAttributiComponent } from './prova-attributi/prova-attributi.component';

export type SelectSample = {
  id: number,
  value: string
}

const values = {
  float: 12.7,
  date: new Date('07/23/2024'),
  dateRange: {
    start: new Date(),
    end: new Date('12/01/2025')
  },
  select: 1,
  multiSelect: [1, 2],
  toggle: true,
  time: '01:45', // usere formato hh:mm per le stringhe
  textArea: `asgsgasdg
  asd`,
  password: 'password'
};

function coloredLog(label: string, value: any) {
  let labelStyle: string[] = [];
  labelStyle.push('color:#' + 'CFFF95');
  labelStyle.push('background:#' + '000000');
  labelStyle.push('font-weight:bold');
  labelStyle.push('font-size:1em');
  labelStyle.push('padding:2px 6px');
  labelStyle.push('border-radius: 5px');
  console.info(...['%c' + label.toLowerCase(), labelStyle.join(';')], value)
}

@Component({
  selector: 'test-pannello',
  template: '<button (click)="chiudi()">chiudi</button>',
  standalone: true,
  providers: [providePanelContext()]
})
export class Pannello {
  private readonly panelContext: PanelContext<Pannello, string> = inject(PANEL_CONTEXT);
  constructor() { coloredLog('panel data', this.panelContext.data.trim()) }
  chiudi() { this.panelContext.panelRef.close({ message: 'ciao Luca' }) }
}

@Component({
  selector: 'test-easy-ui-input',
  standalone: true,
  providers: [providePanelManager()],
  imports: [MatButtonModule, EasyButtonComponent, EasyControlModule, EasyInputModule,
    EasyFormModule, EasySelectModule, JsonPipe, EasySelectOptionDirective, EasyCheckModule,
    GridModule, EasyTemporalModule, ProvaAttributiComponent],
  templateUrl: './test-input.component.html',
  styleUrl: './test-input.component.scss'
})
export class TestInputComponent {

  @ViewChild('form', { static: true }) form!: EasyFormComponent;

  private readonly panelManager: PanelManager = inject(PANEL_MANAGER);

  public readonly templates: DimensionTemplates = new DimensionTemplates();
  public readonly testController: SelectController<SelectSample, number>;

  print(value: unknown) { console.info(value) }

  nuovo() {
    this.panelManager.show(Pannello, { data: 'dati per pannello' })
      .afterClosed()
      .subscribe(result => coloredLog('panel result', result))
  }

  constructor() {
    console.dir(window.innerWidth);
    this.testController = new SelectController(['uno', 'due', 'tre'].map((value, id) => {
      return { id, value };
    }), (valore) => {
      return valore.id
    }, (valore) => valore.value);

    this.templates.add(TipoBreakPoint.XSMALL, GridTemplate.from([
      ['text', 'text'],
      ['integer', 'integer'],
      ['float', 'float'],
      ['password', 'password'],
      ['textArea', 'textArea'],
      ['date', 'date'],
      ['dateRange', 'dateRange'],
      ['time', 'time'],
      ['select', 'select'],
      ['multiSelect', 'multiSelect'],
      ['check', 'toggle'],
    ]));

    this.templates.add(TipoBreakPoint.SMALL, GridTemplate.from([
      ['text', 'integer'],
      ['float', '.'],
      ['password', '.'],
      ['textArea', 'date'],
      ['dateRange', 'time'],
      ['select', 'multiSelect'],
      ['check', 'toggle'],
    ]));

    this.templates.add(TipoBreakPoint.MEDIUM, GridTemplate.from([
      ['text', 'integer', 'float'],
      ['password', 'textArea', 'date'],
      ['dateRange', 'time', 'select'],
      ['multiSelect', 'check', 'toggle'],
    ]));
  }

  public selectSampleValue(item: SelectSample): string { return item.value }

  public ngOnInit() { this.form.setValues(values) }

  public submit(value: object) { coloredLog('form values', value) }

}
