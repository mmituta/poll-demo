import { Option } from './option';
export class PollResult {
  private votes: Map<Option, number> = new Map();

  public addVoteFor(answer: Option): void {
    if (!this.votes.has(answer)) {
      throw new Error(`Answer '${answer.label}' does not exist`);
    }
    this.votes.set(answer, this.getVotesFor(answer) + 1);
  }

  private getVotesFor(answer: Option): number {
    const answerVotes: number | undefined = this.votes.get(answer);
    if (answerVotes) {
      return answerVotes as number;
    }
    return 0;
  }
  public addAnswer(answer: Option): void {
    this.votes.set(answer, 0);
  }

  public deleteAnswer(answer: Option): void {
    this.votes.delete(answer);
  }

  public hasAnswer(answer: Option): any {
    return this.votes.has(answer);
  }

  public voteCount(): number {
    let votesSum = 0;
    this.votes.forEach((answerVotes) => (votesSum += answerVotes));
    return votesSum;
  }

  public getVotes(): AnswerVote[] {
    const answerVotes: AnswerVote[] = [];
    this.votes.forEach((numberOfVotes, answer) =>
      answerVotes.push(new AnswerVote(answer, numberOfVotes))
    );
    return answerVotes;
  }
}
export class AnswerVote {
  constructor(public answer: Option, public votes: number) {}
}
