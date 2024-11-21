import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-test-rest',
  standalone: true,
  imports: [],
  templateUrl: './test-rest.component.html',
  styleUrl: './test-rest.component.scss'
})
export default class TestRestComponent {

  private readonly http: HttpClient = inject(HttpClient);

  protected readonly whoAmI: WritableSignal<string | undefined> = signal(undefined);
  protected readonly error: WritableSignal<string | undefined> = signal(undefined);

  protected getWhoIAm(): void {
    this.http.get('geocall:/api/wstest/whoami', { responseType: 'text' })
      .pipe(catchError((response: HttpErrorResponse, error) => {
        this.error.set(response.message);
        this.whoAmI.set(undefined);
        return throwError(() => error);
      })).subscribe((whoAmI: string) => {
        this.whoAmI.set(whoAmI);
        this.error.set(undefined);
      });
  }
}
