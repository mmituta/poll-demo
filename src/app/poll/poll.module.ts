import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollDefinitionComponent } from './poll-definition/poll-definition.component';
import { PollComponent } from './poll/poll.component';
import { SharedModule } from '../shared/shared.module';
import { AddOptionComponent } from './poll-definition/add-option/add-option.component';
import { FormsModule } from '@angular/forms';
import { EditOptionComponent } from './poll-definition/edit-option/edit-option.component';
import { PollVoteComponent } from './poll-vote/poll-vote.component';



@NgModule({
  declarations: [PollDefinitionComponent, PollComponent, AddOptionComponent, EditOptionComponent, PollVoteComponent],
  imports: [
    SharedModule, FormsModule
  ],
  exports: [PollComponent]
})
export class PollModule { }
