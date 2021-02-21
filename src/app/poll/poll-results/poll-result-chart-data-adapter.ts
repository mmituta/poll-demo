import { IChartistData } from 'chartist';
import { Poll } from '../poll';
import { PollResult, AnswerVote } from '../poll-result';

/**
 * Is responsible for adapting the poll results to the IChartistData type.
 */
export class PollResultChartDataAdapter implements IChartistData {
  public series: Array<number[]>;
  public labels: string[];
  constructor(poll: PollResult) {
    const votes: AnswerVote[] = poll.getVotes();

    this.series = [votes.map((result) => result.votes)];
    this.labels = votes.map((result) => result.answer.label);
  }
}
