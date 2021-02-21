import { Option } from './option';
import { PollResult } from './poll-result';
/**
 * Represents a model of the poll.
 */
export class Poll {
  public title = '';
  public options: Option[] = [];
  public result: PollResult = new PollResult();

  constructor() {
    this.addOption(new Option('First option'));
    this.addOption(new Option('Second option'));
  }
  /**
   * Adds an option to the poll.
   * @param option to be added to the poll.
   */
  public addOption(option: Option): void {
    this.options.push(option);
    this.result.addAnswer(option);
  }

  /**
   * Removes the specified option from te poll.
   * @param option poll to be removed. If the poll does not contain specified option, then nothing will happen.
   */
  public deleteAnswer(option: Option): void {
    this.removeOptionFrom(this.options, option);
    this.deleteFromResults(option);
  }

  private deleteFromResults(answer: Option): void {
    this.result.deleteAnswer(answer);
  }

  private removeOptionFrom(array: Option[], value: Option): void {
    const index: number = array.indexOf(value, 0);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  public voteFor(option: Option): void {
    this.result.addVoteFor(option);
  }
}
