import { Routes } from '@angular/router';
import { FormLinkShortener } from './component/form-link-shortener/form-link-shortener';
import { Redirect } from './component/redirect/redirect';



export const routes: Routes = [
    { path: '', component: FormLinkShortener },
    { path: 'short/:code', component: Redirect },
    { path: '**', redirectTo: '' }
];
