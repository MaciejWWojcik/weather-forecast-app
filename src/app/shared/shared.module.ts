import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherIconPipe } from './pipes/weather-icon.pipe';
import { TaskButtonComponent } from './components/task-button/task-button.component';
import { BoldFragmentPipe } from './pipes/bold-fragment.pipe';


@NgModule({
  declarations: [
    WeatherIconPipe,
    TaskButtonComponent,
    BoldFragmentPipe,
  ],
  imports: [
    CommonModule
  ],
    exports: [
        WeatherIconPipe,
        TaskButtonComponent,
        BoldFragmentPipe,
    ]
})
export class SharedModule {
}
