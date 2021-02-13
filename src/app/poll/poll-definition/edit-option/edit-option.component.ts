import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Option } from '../../option';

@Component({
  selector: 'app-edit-option',
  templateUrl: './edit-option.component.html',
  styleUrls: ['./edit-option.component.css'],
})
export class EditOptionComponent {
  @Input()
  public option: Option = new Option('');
  @Output()
  public optionRemoved: EventEmitter<Option> = new EventEmitter();
  constructor() {}

  public removeOption(): void {
    this.optionRemoved.emit(this.option);
  }
}
