import { Component } from '@angular/core';
import { EasyButtonComponent } from './easy-button/easy-button.component';

@Component({
  selector: 'app-test-bottone',
  standalone: true,
  imports: [EasyButtonComponent],
  templateUrl: './test-bottone.component.html',
  styleUrl: './test-bottone.component.scss'
})
export class TestBottoneComponent {

}
