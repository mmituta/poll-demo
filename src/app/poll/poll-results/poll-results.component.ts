import { Component, Input, OnInit } from '@angular/core';
import { Poll } from '../poll';
import { PollResult } from '../poll-result';
import { Result } from './result-type';
@Component({
  selector: 'app-poll-results',
  templateUrl: './poll-results.component.html',
  styleUrls: ['./poll-results.component.css'],
})
export class PollResultsComponent {
  public data: Result[] = [{ name: 'test', value: 5 }];

  constructor() {}
}
