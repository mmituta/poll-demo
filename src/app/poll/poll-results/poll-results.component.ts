import { Component, DoCheck, Input } from '@angular/core';
import { IBarChartOptions, IChartistData } from 'chartist';
import { Poll } from '../poll';
import { PollResultChartDataAdapter } from './poll-result-chart-data-adapter';
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
    this.data = new PollResultChartDataAdapter(this.poll.result);
  }

  voteCount(): number {
    return this.poll.result.voteCount();
  }
}
