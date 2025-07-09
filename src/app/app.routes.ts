import { Routes } from '@angular/router';
import { Body } from './components/body/body';
import { About } from './components/about/about';


export const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "home",component: Body},
  {path: "about", component: About}
];
