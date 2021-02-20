import { Poll } from './poll';
import { Option } from './option';
import { Result } from './poll-results/result-type';
export class PollResult {

  private votesMap: Map<Option, VoteCount> = new Map();
  constructor(private pollDefintion: Poll) {}

  public get votes(): Result[] {
    return this.pollDefintion.options.map((option) => this.getVotes(option));
  }

  getVotes(option: Option): VoteCount {
    if (!this.votesMap.has(option)) {
      this.votesMap.set(option, new VoteCount(option));
    }
    return this.votesMap.get(option) as VoteCount;
  }

  public addVote(option: Option): void {
    if (this.votesMap.has(option)) {
      this.votesMap.get(option)?.vote();
    } else {
      const vote = new VoteCount(option);
      vote.vote();
      this.votesMap.set(option, vote);
    }
  }
}

class VoteCount implements Result {
  private count = 0;
  constructor(private option: Option) {}

  public get name(): string {
    return this.option.text;
  }

  public vote(): void {
    this.count++;
  }
  public get value(): number {
    return this.count;
  }
}
