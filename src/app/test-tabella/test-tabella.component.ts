import { Component } from '@angular/core';
import { EasyTableModule } from '@ngx-easy-ui/components';

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
  imports: [EasyTableModule],
  templateUrl: './test-tabella.component.html',
  styleUrl: './test-tabella.component.scss'
})
export default class TestTabellaComponent {

  dataSource: TestTable[] = [
    { nome: 'Lorenzo', cognome: 'Muscherà', varie: '123', test: 'test1', test2: 0 },
    { nome: 'Giovanni', cognome: 'Mittone', varie: 'abc', test: 'test2', test2: 1 },
    { nome: 'Gianluca', cognome: 'Basso', varie: '!"£', test: 'test3', test2: 2 },
    { nome: 'Michele', cognome: 'Mosticchio', varie: ',.-', test: 'test4', test2: 3 },
  ];
  footerSource: TestTable = {
    nome: 'Footer nomi',
    cognome: 'Footer cognomi',
    varie: 'varie',
    test: 'test',
    test2: 1000,
  };

}
