import { JsonPipe } from '@angular/common';
import { Component, Signal, ViewChild, WritableSignal, computed, effect, inject, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DimensionTemplates, EasyButtonComponent, EasyCheckModule, EasyUIFullFillDirective, EasyControlModule, EasyFormComponent, EasyFormModule, EasyInputModule, EasySelectModule, EasySelectOptionDirective, EasyTemporalModule, GridModule, GridTemplate, PANEL_CONTEXT, PANEL_MANAGER, PanelContext, PanelManager, SelectController, TipoBreakPoint, providePanelContext, providePanelManager, EasyControl, EasyControlComponent } from '@ngx-easy-ui/components';
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
  textArea: `asgsg`,
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

const templateXSMALLBase = [['text', 'text'],
['integer', 'integer'],
['float', 'float'],
['password', 'password'],
['textArea', 'textArea'],
['date', 'date'],
['dateRange', 'dateRange'],
['time', 'time'],
['select', 'select'],
['multiSelect', 'multiSelect'],
['check', 'toggle']];

const templateSMALLBase = [
  ['text', 'integer'],
  ['float', '.'],
  ['password', '.'],
  ['textArea', 'date'],
  ['dateRange', 'time'],
  ['select', 'multiSelect'],
  ['check', 'toggle'],
];

const templateMEDIUMBase = [
  ['text', 'integer', 'float'],
  ['password', 'textArea', 'date'],
  ['dateRange', 'time', 'select'],
  ['multiSelect', 'check', 'toggle']
];

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
    GridModule, EasyTemporalModule, ProvaAttributiComponent, EasyUIFullFillDirective],
  templateUrl: './test-input.component.html',
  styleUrl: './test-input.component.scss'
})
export default class TestInputComponent {

  @ViewChild('form', { static: true }) form!: EasyFormComponent;
  
  private readonly panelManager: PanelManager = inject(PANEL_MANAGER);

  private readonly toggle: Signal<EasyControlComponent | undefined> = viewChild('toggle');
  private readonly toggleValue: Signal<boolean> = computed(() => this.toggle()?.value());
  protected readonly templates: Signal<DimensionTemplates> = computed(() => this.toggle()?.value() ? new DimensionTemplates() : new DimensionTemplates());

  public readonly testController: SelectController<SelectSample, number>;

  print(value: unknown) { console.info(value) }

  nuovo() {
    this.panelManager.show(Pannello, { data: 'dati per pannello' })
      .afterClosed()
      .subscribe(result => coloredLog('panel result', result))
  }

  constructor() {
    this.testController = new SelectController(['uno', 'due', 'tre'].map((value, id) => {
      return { id, value };
    }), (valore) => {
      return valore.id
    }, (valore) => valore.value);

    effect(() => {
      const value: boolean = this.toggleValue();
      if (value) {
        this.templates().add(TipoBreakPoint.XSMALL, GridTemplate.from([...templateXSMALLBase, ['text2', '.']]));
        this.templates().add(TipoBreakPoint.SMALL, GridTemplate.from([...templateSMALLBase, ['.', 'text2']]));
        this.templates().add(TipoBreakPoint.MEDIUM, GridTemplate.from([...templateMEDIUMBase, ['.', 'text2', 'text2']]));
      } else {
        this.templates().add(TipoBreakPoint.XSMALL, GridTemplate.from(templateXSMALLBase));
        this.templates().add(TipoBreakPoint.SMALL, GridTemplate.from(templateSMALLBase));
        this.templates().add(TipoBreakPoint.MEDIUM, GridTemplate.from(templateMEDIUMBase));
      }
    });
  }

  public selectSampleValue(item: SelectSample): string { return item.value }

  public ngOnInit() { this.form.setValues(values) }

  public submit(value: object) { coloredLog('form values', value) }

}
