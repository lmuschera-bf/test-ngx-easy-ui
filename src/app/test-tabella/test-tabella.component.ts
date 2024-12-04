import { Component, signal, Signal } from '@angular/core';
import { EasyMenuModule, EasyTabelCellDragEnterPredicateFN, EasyTableCellColorFN, EasyTableDataSource, EasyTableModule, EasyTableOperationBarComponent, EasyTableRowColorFN, EasyUIFullFillDirective } from '@ngx-easy-ui/components';

type TestTable = {
  nome: string;
  cognome: string;
  varie: string;
  test: string;
  numero: number;
}

@Component({
  selector: 'app-test-tabella',
  standalone: true,
  imports: [EasyTableModule, EasyUIFullFillDirective, EasyTableOperationBarComponent, EasyMenuModule],
  templateUrl: './test-tabella.component.html',
  styleUrls: ['./test-tabella.component.scss', './range.scss']
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

  protected readonly cellSelectionParams: Signal<{ rowIndex: number, columnName: string }> = signal({ rowIndex: 2, columnName: 'test2' });

  protected dataSource: TestTable[] = [
    { nome: 'Lorenzo', cognome: 'Muscherà', varie: '123', test: 'test1', numero: 0 },
    { nome: 'Giovanni', cognome: 'Mittone', varie: 'abc', test: 'test2', numero: -1 },
    { nome: 'Gianluca', cognome: 'Basso', varie: '!"£', test: 'test3', numero: 3 },
    { nome: 'Michele', cognome: 'Mosticchio', varie: ',.-', test: 'test4', numero: 2 },
    { nome: 'Simone', cognome: 'Cavallini', varie: '123', test: 'test1', numero: 0 },
    { nome: 'Andrea', cognome: 'Bianchi', varie: 'abc', test: 'test2', numero: -1 },
    { nome: 'Paolo', cognome: 'Rossi', varie: '!"£', test: 'test3', numero: 3 },
    { nome: 'Lorenzo', cognome: 'Muscherà', varie: '123', test: 'test1', numero: 0 },
    { nome: 'Giovanni', cognome: 'Mittone', varie: 'abc', test: 'test2', numero: -1 },
    { nome: 'Gianluca', cognome: 'Basso', varie: '!"£', test: 'test3', numero: 3 },
    { nome: 'Michele', cognome: 'Mosticchio', varie: ',.-', test: 'test4', numero: 2 },
    { nome: 'Simone', cognome: 'Cavallini', varie: '123', test: 'test1', numero: 0 },
    { nome: 'Andrea', cognome: 'Bianchi', varie: 'abc', test: 'test2', numero: -1 },
    { nome: 'Paolo', cognome: 'Rossi', varie: '!"£', test: 'test3', numero: 3 },
    { nome: 'Lorenzo', cognome: 'Muscherà', varie: '123', test: 'test1', numero: 0 },
    { nome: 'Giovanni', cognome: 'Mittone', varie: 'abc', test: 'test2', numero: -1 },
    { nome: 'Gianluca', cognome: 'Basso', varie: '!"£', test: 'test3', numero: 3 },
    { nome: 'Michele', cognome: 'Mosticchio', varie: ',.-', test: 'test4', numero: 2 },
    { nome: 'Simone', cognome: 'Cavallini', varie: '123', test: 'test1', numero: 0 },
    { nome: 'Andrea', cognome: 'Bianchi', varie: 'abc', test: 'test2', numero: -1 },
    { nome: 'Paolo', cognome: 'Rossi', varie: '!"£', test: 'test3', numero: 3 },
    { nome: 'Lorenzo', cognome: 'Muscherà', varie: '123', test: 'test1', numero: 0 },
    { nome: 'Giovanni', cognome: 'Mittone', varie: 'abc', test: 'test2', numero: -1 },
    { nome: 'Gianluca', cognome: 'Basso', varie: '!"£', test: 'test3', numero: 3 },
    { nome: 'Michele', cognome: 'Mosticchio', varie: ',.-', test: 'test4', numero: 2 },
    { nome: 'Simone', cognome: 'Cavallini', varie: '123', test: 'test1', numero: 0 },
    { nome: 'Andrea', cognome: 'Bianchi', varie: 'abc', test: 'test2', numero: -1 },
    { nome: 'Paolo', cognome: 'Rossi', varie: '!"£', test: 'test3', numero: 3 },
  ];

  protected dataSourceWithPagination: EasyTableDataSource<TestTable> = new EasyTableDataSource(this.dataSource);

  public readonly initialSelection: Signal<TestTable[]> = signal(this.dataSource.filter((_, i) => i % 2 === 0));

  protected footerSource: TestTable = {
    nome: '',
    cognome: '',
    varie: '',
    test: '',
    numero: this.dataSource.map(x => x.numero).reduce((a, b) => a + b, 0)
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
    if (row.numero < 0) {
      return {
        background: '#cc0002'
      };
    } else if (row.numero > 0) {
      return {
        background: '#368364'
      };
    }
    return {};
  });

  protected grab(...values: any[]) {
    console.log('values', ...values);
  }

  protected dropPredicate: EasyTabelCellDragEnterPredicateFN<TestTable> = (source: TestTable, columnName: string, element: HTMLElement) => {
    if (source.nome === 'Giovanni') {
      return false;
    }
    return true;
  }

}