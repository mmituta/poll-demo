import { Component, Input } from '@angular/core';
import { Poll } from './poll';
import { Answer } from './answer';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css'],
})
export class PollComponent {
  /**
   * Defines the maximum number of answers allowed by the poll.
   */
  @Input()
  public maxAnswers = 10;
  /** Defines the minimum number of answers allowed by the poll. */
  @Input()
  public minAnswers = 2;

  poll: Poll = new Poll();
  constructor() {}

  /**
   * Adds a vote for the specified answer.
   * @param answer that will be voted for.
   */
  public voteFor(answer: Answer): void {
    this.poll.voteFor(answer);
  }

  /**
   * Resets the poll to its initial state. It removes the title, the answers and the votes added by the user.
   */
  public resetPoll(): void {
    this.poll = new Poll();
  }
}
