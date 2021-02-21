import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Answer } from '../../answer';

/**
 * This component is responsible for creating new poll answers.
 * When the answer is created, the event is emitted, and the component is reseted to its
 * initial state - it is ready for creating another answer.
 */
@Component({
  selector: 'app-answer-add',
  templateUrl: './answer-add.component.html',
})
export class AddAnswerComponent {
  /**
   * Event that will be emitted the moment the answer is created. It contains the created answer.
   */
  @Output()
  public answerCreated: EventEmitter<Answer> = new EventEmitter();

  /**
   * Defines if the component is disabled. If the component is disabled, the input and the button for creating new answer will be disabled.
   */
  @Input()
  public disabled: boolean;

  answerText: string;

  constructor() {}

  /**
   * When called it will emit an event that contains the created answer.
   * After the event is emitted, the component will be reverted to its initial state.
   */
  public createAnswer(): void {
    this.answerCreated.emit(new Answer(this.answerText));
    this.answerText = '';
  }
}
