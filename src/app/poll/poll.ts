import { Option } from './option';
import { Result } from './poll-results/result-type';
/**
 * Represents a model of the poll.
 */
export class Poll {
  public title = '';
  public options: Option[] = [];
  public results: OptionResultAdapter[] = [];
  /**
   * Adds an option to the poll.
   * @param option to be added to the poll.
   */
  public addOption(option: Option): void {
    this.options.push(option);
    this.results.push(new OptionResultAdapter(option));
  }

  /**
   * Removes the specified option from te poll.
   * @param option poll to be removed. If the poll does not contain specified option, then nothing will happen.
   */
  public removeOption(option: Option): void {
    this.removeOptionFrom(this.options, option);
    this.removeFromResults(this.results, option);
  }

  private removeFromResults(
    results: OptionResultAdapter[],
    option: Option
  ): void {
    this.removeFromArray(
      results,
      results.map((result) => result.option).indexOf(option, 0) // TODO check findIndex method
    );
  }

  private removeOptionFrom(array: Option[], value: Option): void {
    this.removeFromArray(array, array.indexOf(value, 0));
  }
  private removeFromArray(array: any[], index: number): void {
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  public voteFor(option: Option): void {
    const votedResult = this.results.find(
      (result) => result.option === option
    );
    if (votedResult) {
      votedResult.value++;
    }
  }
}
export class OptionResultAdapter implements Result {
  public value = 0;
  constructor(public option: Option) {}
  public get name(): string {
    return this.option.label;
  }
}
