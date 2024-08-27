import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, Injector, OnInit, ViewChild, computed, effect, inject, input } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'easy-button',
  standalone: true,
  imports: [MatButtonModule, NgTemplateOutlet],
  templateUrl: './easy-button.component.html',
  styleUrl: './easy-button.component.scss'
})
export class EasyButtonComponent implements OnInit, AfterViewInit {

  private readonly injector: Injector = inject(Injector);

  //TODO lmuschera direttive che mappano quelle material per poter stare agnostici
  //TODO lmuschera direttiva per far gestire il disabled se presente FormGroup
  //TODO lmuschera gestione dell'icona (direttiva ad hoc e usare il template? *XXX)

  @ViewChild(FormGroupDirective) readonly formGroupDirective: FormGroupDirective | null = inject(FormGroupDirective, { host: true, optional: true });
  type = input('button');

  constructor() {
    effect(() => {
      console.dir(this.type());
    })
  }
  
  ngOnInit(): void {
    console.dir('EasyButtonComponent[ngOnInit]')
  }

  ngAfterViewInit(): void {
    console.dir(this.formGroupDirective);
  }

}
