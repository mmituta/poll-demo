import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Poll } from '../poll';
import { Answer } from '../answer';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: ['./poll-vote.component.css'],
})
export class PollVoteComponent {
  selectedAnswer: Answer;
  @Input()
  poll: Poll = new Poll();

  @Output()
  voteCasted: EventEmitter<Answer> = new EventEmitter();
  constructor() {}

  public onSubmit(): void {
    this.voteCasted.emit(this.selectedAnswer);
  }

  noAnswerSelected(): boolean {
    return this.selectedAnswer ? false : true;
  }
}
