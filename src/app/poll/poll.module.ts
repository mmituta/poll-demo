import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollDefinitionComponent } from './poll-definition/poll-definition.component';
import { PollComponent } from './poll/poll.component';
import { SharedModule } from '../shared/shared.module';
import { AddOptionComponent } from './poll-definition/add-option/add-option.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [PollDefinitionComponent, PollComponent, AddOptionComponent],
  imports: [
    CommonModule, SharedModule, FormsModule
  ],
  exports: [PollComponent]
})
export class PollModule { }
