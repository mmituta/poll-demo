import { Answer } from '../answer';
import { Result } from '../result';
import { PollResultChartDataAdapter } from './poll-result-chart-data-adapter';
describe('Tests for the PollResultChartDataAdapter class', () => {
  let result: Result;
  beforeEach(() => {
    result = new Result();
  });

  it('should return empty array of labels if results are empty', () => {
    const adapter: PollResultChartDataAdapter = new PollResultChartDataAdapter(
      result
    );

    expect(adapter.labels.length).toEqual(0);
  });

  it('should return a single emptyseries if results are empty', () => {
    const adapter: PollResultChartDataAdapter = new PollResultChartDataAdapter(
      result
    );

    expect(adapter.series.length).toEqual(1);
    expect(adapter.series[0].length).toEqual(0);
  });

  it('should return the arrays of labels and vote counts from the result', () => {
    const firstAnswer = new Answer('1');
    const secondAnswer = new Answer('2');
    result.addAnswer(firstAnswer);
    result.addAnswer(secondAnswer);

    result.addVoteFor(firstAnswer);
    result.addVoteFor(firstAnswer);
    result.addVoteFor(secondAnswer);
    const adapter: PollResultChartDataAdapter = new PollResultChartDataAdapter(
      result
    );

    expect(adapter.labels).toEqual(['1', '2']);
    expect(adapter.series[0]).toEqual([2, 1]);
  });

  it('should return 0 for answers that had no votes', () => {
    const firstAnswer = new Answer('1');
    const secondAnswer = new Answer('2');
    const thirdAnswer = new Answer('3');

    result.addAnswer(firstAnswer);
    result.addAnswer(secondAnswer);
    result.addAnswer(thirdAnswer);

    result.addVoteFor(firstAnswer);
    result.addVoteFor(thirdAnswer);

    const adapter: PollResultChartDataAdapter = new PollResultChartDataAdapter(
      result
    );

    expect(adapter.labels).toEqual(['1', '2', '3']);
    expect(adapter.series[0]).toEqual([1, 0, 1]);
  });
});
