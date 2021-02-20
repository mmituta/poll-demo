import { IChartistData } from 'chartist';
import { Poll } from '../poll';

export class PollResult implements IChartistData {
  constructor(public poll: Poll) {}

  get series(): Array<number[]> {
    return [this.poll.results.map((result) => result.votes)];
  }
  set series(value: Array<number[]>) {}
  get labels(): string[] {
    return this.poll.results.map((result) => result.name);
  }

  set labels(labels: string[]) {}
}