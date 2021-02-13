import { Component, EventEmitter, Output } from '@angular/core';

/**
 * This component is responsible for creating new poll options.
 * It doesn't have any inputs, and the only output is the text of the created option.
 * When the option is created, the event is emitted, and the component is reseted to its
 * initial state - it is ready for creating another option.
 */
@Component({
  selector: 'app-add-option',
  templateUrl: './add-option.component.html',
  styleUrls: ['./add-option.component.css'],
})
export class AddOptionComponent {

  /**
   * Event that will be emitted the moment the option is  created. It contains the text of the created option.
   */
  @Output()
  public optionCreated: EventEmitter<string> = new EventEmitter();

  optionText: string;

  constructor() {}


  /**
   * When called it will emit an event that contains the text of the option.
   * After the event is emitted, the component will be reverted to its initial state.
   */
  public createOption(): void {
    this.optionCreated.emit(this.optionText);
    this.optionText = '';
  }
}
