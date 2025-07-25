import { Routes } from '@angular/router';
import { Body } from './components/body/body';
import { About } from './components/about/about';
import { ViewMetar } from './components/view-metar/view-metar';
import { TodCalculator } from './components/tod-calculator/tod-calculator';

export const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "home",component: Body},
  {path: "about", component: About},
  {path: "view-metar", component: ViewMetar},
  {path: "tod-calculator", component: TodCalculator},
];
