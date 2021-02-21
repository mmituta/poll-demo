import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Answer } from '../../answer';

/**
 * Is responsible for editing the answer of a poll.
 */
@Component({
  selector: 'app-answer-edit',
  templateUrl: './answer-edit.component.html',
})
export class EditAnswerComponent {
  /**
   * The id of the component. It will be used to generate the ids of component children of this component.
   */
  @Input()
  public id: string;

  /**
   * Defines if the deleting of the anaswer should be disabled.
   */
  @Input()
  public deleteDisabled: boolean;

  /**
   * The answer that will be edited.
   */
  @Input()
  public answer: Answer = new Answer('');
  /**
   * Event that will be generated when the answer should be removed.
   */
  @Output()
  public answerRemoved: EventEmitter<Answer> = new EventEmitter();

  /**
   * Emits the answer removed event.
   */
  public removeAnswer(): void {
    this.answerRemoved.emit(this.answer);
  }
}
