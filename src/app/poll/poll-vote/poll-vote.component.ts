import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Poll, PollDefinition } from '../poll';
import { Answer } from '../answer';
import { NullObjectPoll } from '../null-object-poll-definition';

/**
 * Is allows the user to cast votes.
 */
@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: ['./poll-vote.component.css'],
})
export class PollVoteComponent {
  selectedAnswer: Answer;
  /**
   * The poll which will serve as the source of answers.
   */
  @Input()
  poll: PollDefinition = new NullObjectPoll();

  /**
   * Will be triggered when the user votes on an answer. It will contain the answert that was voted on.
   */
  @Output()
  voteCasted: EventEmitter<Answer> = new EventEmitter();
  constructor() {}

  /**
   * Is resopnsible for emitting the event with selected answer.
   */
  public emitVote(): void {
    this.voteCasted.emit(this.selectedAnswer);
  }

  /**
   * Checks if there is no answer selected.
   */
  noAnswerSelected(): boolean {
    return this.selectedAnswer ? false : true;
  }
}
