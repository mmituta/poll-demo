import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PollDefinition } from '../poll';
import { Answer } from '../answer';
import { NullObjectPoll } from '../null-object-poll-definition';

/**
 * Component that is responsible for defining the poll.
 * It allows the user to change the title of the poll and add/edit/remove answers.
 */
@Component({
  selector: 'app-poll-definition',
  templateUrl: './poll-definition.component.html',
  styleUrls: ['./poll-definition.component.css'],
})
export class PollDefinitionComponent {
  /**
   * Maximum number of answers the componend will allow to define.
   * If the number of answers reaches the maximum, then adding new answers will be disabled.
   */
  @Input()
  maxAnswers: number;
  /**
   * Minimum number of answers the component will allow to define.
   * If the number of answers teaches the minimum, then removing answers will be disabled.
   */
  @Input()
  minAnswers: number;
  /**
   * Instance of poll that will be edited by the component.
   */
  @Input()
  poll: PollDefinition = new NullObjectPoll();

  /**
   * Represents the event of poll reset. The event indicates that the poll should be reseted to it's initial state.
   */
  @Output()
  public pollReset: EventEmitter<void> = new EventEmitter();
  constructor() {}

  /**
   * Adds an answer to the poll.
   * @param answer to be added.
   */
  public addAnswer(answer: Answer): void {
    this.poll.addAnswer(answer);
  }

  /**
   * Removes the answer from the poll.
   * @param answer answer to be removed.
   */
  public removeAnswer(answer: Answer): void {
    this.poll.deleteAnswer(answer);
  }

  /**
   * Emits the poll reset event.
   */
  public reset(): void {
    this.pollReset.emit();
  }

  /**
   * Checks if the maximum number of answers has been reached.
   */
  public maxNumberOfAnswersReached(): boolean {
    return this.poll.answersCount() >= this.maxAnswers;
  }

  /**
   * Checks if the minimum number of answers has been reached.
   */
  public minNumberOfAnswersReached(): boolean {
    return this.poll.answersCount() <= this.minAnswers;
  }
}
