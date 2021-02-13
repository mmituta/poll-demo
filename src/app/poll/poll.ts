import { Option } from './option';
/**
 * Represents a model of the poll.
 */
export class Poll {
  public title = '';
  public options: Option[] = [];

  /**
   * Adds an option to the poll.
   * @param option to be added to the poll.
   */
  public addOption(option: Option): void {
    this.options.push(option);
  }

  /**
   * Removes the specified option from te poll.
   * @param option poll to be removed. If the poll does not contain specified option, then nothing will happen.
   */
  public removeOption(option: Option): void {
    const index = this.options.indexOf(option, 0);
    if (index > -1) {
      this.options.splice(index, 1);
    }
  }
}
