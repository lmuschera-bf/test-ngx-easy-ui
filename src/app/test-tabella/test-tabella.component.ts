import { NgStyle } from '@angular/common';
import { Component, effect, signal, Signal, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EasyTableCellColorFN, EasyTableComponent, EasyTableDataSource, EasyTableDataSourceDirective, EasyTableModule, EasyTableRowColorFN, EasyTablePaginatorComponent, EasyTableRowSelection, EasyUIClickTrap, EasyUIFullFillDirective } from '@ngx-easy-ui/components';

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

  protected parseInt(value: string): number {
    return parseInt(value, 10);
  }

  protected none(): void {
    // empty
  }

  protected onlyOne(checkbox: any) {
    var checkboxes = document.getElementsByName(checkbox.name)
    checkboxes.forEach((item: any) => {
      if (item !== checkbox) item.checked = false
    })
  }

  // TODO lmuschera aggiungere esempio con EasyTableDataSource

  protected readonly easyTable: Signal<EasyTableComponent<TestTable>> = viewChild.required('easytable');

  protected readonly cellSelectionParams: Signal<{ rowIndex: number, columnName: string }> = signal({ rowIndex: 2, columnName: 'test2' });

  private readonly paginator: Signal<EasyTablePaginatorComponent<TestTable>> = viewChild.required('paginator');
  
  protected dataSource: TestTable[] = [
    { nome: 'Lorenzo', cognome: 'Muscherà', varie: '123', test: 'test1', test2: 0 },
    { nome: 'Giovanni', cognome: 'Mittone', varie: 'abc', test: 'test2', test2: -1 },
    { nome: 'Gianluca', cognome: 'Basso', varie: '!"£', test: 'test3', test2: 3 },
    { nome: 'Michele', cognome: 'Mosticchio', varie: ',.-', test: 'test4', test2: 2 },
    { nome: 'Simone', cognome: 'Cavallini', varie: '123', test: 'test1', test2: 0 },
    { nome: 'Andrea', cognome: 'Bianchi', varie: 'abc', test: 'test2', test2: -1 },
    { nome: 'Paolo', cognome: 'Rossi', varie: '!"£', test: 'test3', test2: 3 },
    { nome: 'Lorenzo', cognome: 'Muscherà', varie: '123', test: 'test1', test2: 0 },
    { nome: 'Giovanni', cognome: 'Mittone', varie: 'abc', test: 'test2', test2: -1 },
    { nome: 'Gianluca', cognome: 'Basso', varie: '!"£', test: 'test3', test2: 3 },
    { nome: 'Michele', cognome: 'Mosticchio', varie: ',.-', test: 'test4', test2: 2 },
    { nome: 'Simone', cognome: 'Cavallini', varie: '123', test: 'test1', test2: 0 },
    { nome: 'Andrea', cognome: 'Bianchi', varie: 'abc', test: 'test2', test2: -1 },
    { nome: 'Paolo', cognome: 'Rossi', varie: '!"£', test: 'test3', test2: 3 },
    { nome: 'Lorenzo', cognome: 'Muscherà', varie: '123', test: 'test1', test2: 0 },
    { nome: 'Giovanni', cognome: 'Mittone', varie: 'abc', test: 'test2', test2: -1 },
    { nome: 'Gianluca', cognome: 'Basso', varie: '!"£', test: 'test3', test2: 3 },
    { nome: 'Michele', cognome: 'Mosticchio', varie: ',.-', test: 'test4', test2: 2 },
    { nome: 'Simone', cognome: 'Cavallini', varie: '123', test: 'test1', test2: 0 },
    { nome: 'Andrea', cognome: 'Bianchi', varie: 'abc', test: 'test2', test2: -1 },
    { nome: 'Paolo', cognome: 'Rossi', varie: '!"£', test: 'test3', test2: 3 },
    { nome: 'Lorenzo', cognome: 'Muscherà', varie: '123', test: 'test1', test2: 0 },
    { nome: 'Giovanni', cognome: 'Mittone', varie: 'abc', test: 'test2', test2: -1 },
    { nome: 'Gianluca', cognome: 'Basso', varie: '!"£', test: 'test3', test2: 3 },
    { nome: 'Michele', cognome: 'Mosticchio', varie: ',.-', test: 'test4', test2: 2 },
    { nome: 'Simone', cognome: 'Cavallini', varie: '123', test: 'test1', test2: 0 },
    { nome: 'Andrea', cognome: 'Bianchi', varie: 'abc', test: 'test2', test2: -1 },
    { nome: 'Paolo', cognome: 'Rossi', varie: '!"£', test: 'test3', test2: 3 },
  ];

  protected dataSourceWithPagination: EasyTableDataSource<TestTable> = new EasyTableDataSource(this.dataSource);

  protected footerSource: TestTable = {
    nome: '',
    cognome: '',
    varie: '',
    test: '',
    test2: this.dataSource.map(x => x.test2).reduce((a, b) => a + b, 0)
  };

  protected rowColorFN: Signal<EasyTableRowColorFN<TestTable>> = signal((row: TestTable) => {
    if (row.nome === 'Gianluca') {
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
    } else if (row.nome === 'Paolo') {
      return {
        text: 'black',
        background: 'yellow'
      };
    }
    return {};
  });

  protected cellColorFN: Signal<EasyTableCellColorFN<TestTable>> = signal((row: TestTable) => {
    if (row.test2 < 0) {
      return {
        background: '#cc0002'
      };
    } else if (row.test2 > 0) {
      return {
        background: '#368364'
      };
    }
    return {};
  });

  public readonly initialSelection: Signal<TestTable[]> = signal(this.dataSource.filter((_, i) => i % 2 === 0));

  constructor() {
    effect(() => {
      if (this.paginator().ready()) {
        this.paginator().bindToDataSource(this.dataSourceWithPagination);
      }
    });
  }

  protected selectionChange(value: EasyTableRowSelection<TestTable>) {
    console.dir(value);
  }

  protected grab(...values: any[]) {
    console.log('values', values);
  }

}
