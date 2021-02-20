import { Component, Input } from '@angular/core';
import { Poll } from './poll';
import { Option } from './option';
import { PollResult } from './poll-result';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css'],
})
export class PollComponent {
  @Input()
  questionLimit = 10;
  poll: Poll = new Poll();
  constructor() {
  }

  public onVote(option: Option): void {
    this.poll.voteFor(option);
  }
}