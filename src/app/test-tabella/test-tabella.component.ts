import { NgStyle } from '@angular/common';
import { Component, signal, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EasyTableDataSourceDirective, EasyTableModule, EasyTableRowColorFN, EasyTableRowSelection, EasyUIClickTrap, EasyUIFullFillDirective } from '@ngx-easy-ui/components';

type TestTable = {
  nome: string;
  cognome: string;
  varie: string;
  test: string;
  test2: number;
}



@Component({
  selector: 'app-test-tabella',
  standalone: true,
  imports: [EasyTableModule, MatIconModule, EasyUIFullFillDirective, EasyUIClickTrap, NgStyle, EasyTableDataSourceDirective],
  templateUrl: './test-tabella.component.html',
  styleUrl: './test-tabella.component.scss'
})
export default class TestTabellaComponent {

  // TODO lmuschera aggiungere esempio con EasyTableDataSource

  dataSource: TestTable[] = [
    { nome: 'Lorenzo', cognome: 'Muscherà', varie: '123', test: 'test1', test2: 0 },
    { nome: 'Giovanni', cognome: 'Mittone', varie: 'abc', test: 'test2', test2: 1 },
    { nome: 'Gianluca', cognome: 'Basso', varie: '!"£', test: 'test3', test2: 3 },
    { nome: 'Michele', cognome: 'Mosticchio', varie: ',.-', test: 'test4', test2: 2 },
  ];
  footerSource: TestTable = {
    nome: '',
    cognome: '',
    varie: '',
    test: '',
    test2: this.dataSource.map(x => x.test2).reduce((a, b) => a + b, 0)
  };

  protected fn: Signal<EasyTableRowColorFN<TestTable>> = signal((row: TestTable) => {
    if(row.nome === 'Gianluca') {
      return {
        text: 'black',
        background: '#f99245'
      };
    } else if (row.nome === 'Michele') {
      return {
        text: 'black',
        background: '#badbff'
      };
    } else if (row.nome === 'Giovanni') {
      return {
        text: 'white',
        background: '#308446'
      };
    }
    return {};
  });

  public readonly initialSelection: Signal<TestTable[]> = signal(this.dataSource.filter((_, i) => i % 2 === 0));

  protected selectionChange(value: EasyTableRowSelection<TestTable>) {
    console.dir(value);
  }

  protected grab(...values: any[]) {
    console.log('values', values);
  }

}
