import { NgModule } from '@angular/core';
import { PollDefinitionComponent } from './poll-definition/poll-definition.component';
import { SharedModule } from '../shared/shared.module';
import { AddAnswerComponent } from './poll-definition/answer-add/answer-add.component';
import { FormsModule } from '@angular/forms';
import { EditOptionAnswerComponent } from './poll-definition/answer-edit/answer-edit.component';
import { PollVoteComponent } from './poll-vote/poll-vote.component';
import { PollComponent } from './poll.component';
import { PollResultsComponent } from './poll-results/poll-results.component';
import { ChartistModule } from 'ng-chartist';
@NgModule({
  declarations: [PollDefinitionComponent, PollComponent, AddAnswerComponent, EditOptionAnswerComponent, PollVoteComponent, PollResultsComponent],
  imports: [
    SharedModule, FormsModule, ChartistModule
  ],
  exports: [PollComponent]
})
export class PollModule { }
