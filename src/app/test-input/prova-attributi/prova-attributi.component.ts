import { Component, Injector, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

export class PanelTest {
  test = (value: unknown, context: unknown & { kind: string }) => { // (A)
    console.dir(value, context);
    if (context.kind === 'class') {
      console.dir(inject(Injector));
    }
  };
}



export function panel(): (target: (data: unknown) => unknown, context: unknown & { kind: string }) => void {
  const injector: Injector = Injector.create({
    providers: [MatDialogModule]
  });

  injector.get(MatDialog).open(ProvaAttributiComponent);

  return function modale(target: (data: unknown) => unknown, context: unknown & { kind: string }) {
    if (context.kind === "method") {
      console.dir(target);
      return function (this: unknown, _data: unknown) {
        return;
      }
    }
    throw Error("not a method");
  };
}

@Component({
  selector: 'prova-attributi',
  standalone: true,
  imports: [],
  templateUrl: './prova-attributi.component.html',
  styleUrl: './prova-attributi.component.scss'
})
export class ProvaAttributiComponent {

}
