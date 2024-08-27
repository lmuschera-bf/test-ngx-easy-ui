import { Routes } from '@angular/router';
import { TematizzaComponent } from './tematizza/tematizza.component';
import { TestBottoneComponent } from './test-bottone/test-bottone.component';
import { TestInputComponent } from './test-input/test-input.component';

export const routes: Routes = [
    {
        path: 'tabella', loadComponent: () => import(`./test-tabella/test-tabella.component`)
    },
    {
        path: 'input', loadComponent: () => TestInputComponent
    },
    {
        path: 'tematizza', loadComponent: () => TematizzaComponent
    },
    {
        path: 'buttons', loadComponent: () => TestBottoneComponent
    }
];
