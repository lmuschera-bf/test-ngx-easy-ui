import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'tabella', loadComponent: () => import(`./test-tabella/test-tabella.component`)
    },
    {
        path: 'input', loadComponent: () => import(`./test-input/test-input.component`)
    },
    {
        path: 'tematizza', loadComponent: () => import(`./tematizza/tematizza.component`)
    },
    {
        path: 'buttons', loadComponent: () => import(`./test-bottone/test-bottone.component`)
    },
    {
        path: 'albero', loadComponent: () => import(`./test-albero/test-albero.component`)
    },
    {
        path: 'resttest', loadComponent: () => import(`./test-rest/test-rest.component`)
    }
];
