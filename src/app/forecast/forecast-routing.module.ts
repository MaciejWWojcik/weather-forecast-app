import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ForecastPageComponent } from './pages/forecast-page/forecast-page.component';

const routes: Routes = [
  { path: ':zip/:country', component: ForecastPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForecastRoutingModule {
}
