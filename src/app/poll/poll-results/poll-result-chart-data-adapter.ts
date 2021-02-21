import { IChartistData } from 'chartist';
import { Poll } from '../poll';
import { PollResult, AnswerVote } from '../poll-result';

/**
 * Is responsible for adapting the poll results to the IChartistData type.
 */
export class PollResultChartDataAdapter implements IChartistData {
  /**
   * Contains the series to be display on the chart. In case of the poll results, it will always be a single series of numbers.
   * The resulting array will always have on element - an array of numbers.
   */
  public series: Array<number[]>;

  /**
   * Contains the labels for the x-axis of the chart.
   * The order of the labels corresponds to the order of values in a serie.
   */
  public labels: string[];
  /**
   * Creates a new instance of adapter that will adapt the provided PollResult instance.
   * @param poll will be adapter to the IChartistData type.
   */
  constructor(poll: PollResult) {
    const votes: AnswerVote[] = poll.getVotes();

    this.series = [votes.map((result) => result.votes)];
    this.labels = votes.map((result) => result.answer.label);
  }
}
