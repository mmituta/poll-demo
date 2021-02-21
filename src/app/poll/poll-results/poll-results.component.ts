import { Component, DoCheck, Input } from '@angular/core';
import { IBarChartOptions, IChartistData } from 'chartist';
import { Poll, PollResults } from '../poll';
import { PollResultChartDataAdapter } from './poll-result-chart-data-adapter';
/**
 * Represents the results of the poll. It includes a chart component that visualises the result.
 */
@Component({
  selector: 'app-poll-results',
  templateUrl: './poll-results.component.html',
})
export class PollResultsComponent implements DoCheck {
  data: IChartistData = {
    labels: [],
    series: [],
  };
  /**
   * The poll that the results will be displayed.
   */
  @Input()
  public results: PollResults = new Poll();

  options: IBarChartOptions = {
    axisX: {
      showGrid: false,
    },
    axisY: {
      onlyInteger: true,
    },
    height: 200,
    width: 200,
  };

  /**
   * Updates the chart data with the poll results.
   * The new instances of labels and series array need to be created for the chart component to realize that change occured.
   * If the same instance of an array was to be used, just with elements that are being changed,
   * the change detection mechanism would not realize the changes.
   */
  ngDoCheck(): void {
    this.data = new PollResultChartDataAdapter(this.results.result);
  }

  /**
   * Returns the total number of votes.
   */
  voteCount(): number {
    return this.results.result.voteCount();
  }
}
