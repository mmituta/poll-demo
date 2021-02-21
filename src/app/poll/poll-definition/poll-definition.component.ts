import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Poll } from '../poll';
import { Option } from '../option';

@Component({
  selector: 'app-poll-definition',
  templateUrl: './poll-definition.component.html',
  styleUrls: ['./poll-definition.component.css'],
})
export class PollDefinitionComponent {
  @Input()
  questionLimit: number;
  @Input()
  poll: Poll = new Poll();

  @Output()
  public pollReset: EventEmitter<void> = new EventEmitter();
  constructor() {}

  public onOptionAdded(option: Option): void {
    this.poll.addOption(option);
  }

  public onOptionRemoved(option: Option): void{
    this.poll.removeOption(option);
  }

  public reset(): void{
    this.pollReset.emit();
  }

  public isAddingDisabled(): boolean{
    return this.poll.options.length >= this.questionLimit;
  }
}
