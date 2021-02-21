import { Answer } from './answer';
export class PollResult {
  private votes: Map<Answer, number> = new Map();

  public addVoteFor(answer: Answer): void {
    if (!this.votes.has(answer)) {
      throw new Error(`Answer '${answer.label}' does not exist`);
    }
    this.votes.set(answer, this.getVotesFor(answer) + 1);
  }

  public getVotesFor(answer: Answer): number {
    const answerVotes: number | undefined = this.votes.get(answer);
    if (answerVotes) {
      return answerVotes as number;
    }
    return 0;
  }
  public addAnswer(answer: Answer): void {
    this.votes.set(answer, 0);
  }


  public deleteAnswer(answer: Answer): void {
    this.votes.delete(answer);
  }

  public hasAnswer(answer: Answer): any {
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
  constructor(public answer: Answer, public votes: number) {}
}
