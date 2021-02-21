import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Poll } from '../poll';
import { Option } from '../option';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: ['./poll-vote.component.css'],
})
export class PollVoteComponent {
  selectedOption: Option;
  @Input()
  poll: Poll = new Poll();

  @Output()
  voteCasted: EventEmitter<Option> = new EventEmitter();
  constructor() {}

  public onSubmit(): void {
    this.voteCasted.emit(this.selectedOption);
  }

  noOptionSelected(): boolean {
    return this.selectedOption ? false : true;
  }
}
