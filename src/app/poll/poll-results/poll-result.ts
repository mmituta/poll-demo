import { IChartistData } from 'chartist';
import { Poll } from '../poll';

export class PollResult implements IChartistData {
  public series: Array<number[]>;
  public labels: string[];
  constructor(poll: Poll) {
    this.series = [poll.results.map((result) => result.votes)];
    this.labels = poll.results.map((result) => result.name);
  }
}
