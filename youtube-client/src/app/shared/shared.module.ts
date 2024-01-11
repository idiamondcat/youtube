import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationIndicatorDirective } from './directives/validation-indicator.directive';

@NgModule({
  declarations: [ValidationIndicatorDirective],
  exports: [ValidationIndicatorDirective],
  imports: [CommonModule],
})
export class SharedModule {}
