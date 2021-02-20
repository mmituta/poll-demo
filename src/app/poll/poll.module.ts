import { NgModule } from '@angular/core';
import { PollDefinitionComponent } from './poll-definition/poll-definition.component';
import { SharedModule } from '../shared/shared.module';
import { AddOptionComponent } from './poll-definition/add-option/add-option.component';
import { FormsModule } from '@angular/forms';
import { EditOptionComponent } from './poll-definition/edit-option/edit-option.component';
import { PollVoteComponent } from './poll-vote/poll-vote.component';
import { PollComponent } from './poll.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PollResultsComponent } from './poll-results/poll-results.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [PollDefinitionComponent, PollComponent, AddOptionComponent, EditOptionComponent, PollVoteComponent, PollResultsComponent],
  imports: [
    SharedModule, FormsModule, NgxChartsModule, BrowserAnimationsModule
  ],
  exports: [PollComponent]
})
export class PollModule { }
