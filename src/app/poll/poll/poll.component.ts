import { Component, Input, OnInit } from '@angular/core';
import { Poll } from '../poll';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css'],
})
export class PollComponent {
  @Input()
  questionLimit = 10;
  poll: Poll = new Poll();
  constructor() {}
}
