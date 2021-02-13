import { Component, Input, OnInit } from '@angular/core';
import { Poll } from '../poll';

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
  constructor() {}

  public onOptionAdded(option: string): void {
    this.poll.addOption(option);
  }
}
