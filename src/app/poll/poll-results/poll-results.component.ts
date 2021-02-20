import { Component, DoCheck, Input } from '@angular/core';
import { IBarChartOptions, IChartistData } from 'chartist';
import { Poll } from '../poll';
import { PollResult } from './poll-result';
@Component({
  selector: 'app-poll-results',
  templateUrl: './poll-results.component.html',
  styleUrls: ['./poll-results.component.css'],
})
export class PollResultsComponent implements DoCheck {
  data: IChartistData = {
    labels: [],
    series: [],
  };
  @Input()
  public poll: Poll = new Poll();

  options: IBarChartOptions = {
    axisX: {
      showGrid: false,
    },
    axisY: {
      onlyInteger: true,
    },
    height: 300,
  };

  ngDoCheck(): void {
    this.data = new PollResult(this.poll);
  }

  voteCount(): number {
    let count = 0;
    this.poll.results.forEach((result) => (count += result.votes));
    return count;
  }
}
