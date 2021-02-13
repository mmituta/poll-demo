import { Option } from './option';
export class Poll {
  public title = '';
  public options: Option[] = [];

  public addOption(text: string): void {
    this.options.push(new Option(text));
  }
}
