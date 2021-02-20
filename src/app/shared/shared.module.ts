import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimitedValueLengthDirective } from './limited-value-length-directive';

@NgModule({
  declarations: [LimitedValueLengthDirective],
  imports: [
    CommonModule
  ],
  exports: [LimitedValueLengthDirective, CommonModule]
})
export class SharedModule { }
