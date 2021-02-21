import { Answer } from './answer';

/**
 * Represenst the result of the poll. It contains the information about the votes each of the answers has received.
 */
export class Result {
  private votes: Map<Answer, number> = new Map();

  /**
   * Adds a vote for the specified answer. It will throw an error if the specified answer does not exist.
   * @param answer answer for which the vote will be added.
   * @see {@link hasAnswer}
   */
  public addVoteFor(answer: Answer): void {
    this.checkIfExists(answer);
    this.votes.set(answer, this.getVotesFor(answer) + 1);
  }

  /**
   * Gets the number of votes added for the specified answer. It will throw an error if the specified answer does not exist.
   * @param answer answer for which the votes will be returned.
   * @see {@link hasAnswer}
   */
  public getVotesFor(answer: Answer): number {
    this.checkIfExists(answer);
    const answerVotes: number | undefined = this.votes.get(answer);
    if (answerVotes) {
      return answerVotes as number;
    }
    return 0;
  }
  /**
   * Adds an answer to the result. After added, the answer has zero votes.
   * @param answer answer to be added.
   * @see {@link addVoteFor}
   */
  public addAnswer(answer: Answer): void {
    this.votes.set(answer, 0);
  }

  /**
   * Deletes an answer from the resulsts. If such answer does not exist, nothing will happen.
   * @param answer answer to be removed.
   */
  public deleteAnswer(answer: Answer): void {
    this.votes.delete(answer);
  }

  /**
   * Checks if the specified answer exists in the results.
   * @param answer the answer to be checked.
   */
  public hasAnswer(answer: Answer): any {
    return this.votes.has(answer);
  }

  /**
   * Gets the total number of votes in the results.
   */
  public voteCount(): number {
    let votesSum = 0;
    this.votes.forEach((answerVotes) => (votesSum += answerVotes));
    return votesSum;
  }

  /**
   * Gets the votes from the results. It returns a pair of answer, along with the number of votes it has received.
   */
  public getVotes(): AnswerVote[] {
    const answerVotes: AnswerVote[] = [];
    this.votes.forEach((numberOfVotes, answer) =>
      answerVotes.push(new AnswerVote(answer, numberOfVotes))
    );
    return answerVotes;
  }

  private checkIfExists(answer: Answer): void {
    if (!this.votes.has(answer)) {
      throw new Error(`Answer '${answer.label}' does not exist`);
    }
  }
}

/**
 * Class that repreents the pairing of answer and the number of votes it has received.
 */
export class AnswerVote {
  /**
   * Creates a new instance of AnswerVote.
   * @param answer from the results.
   * @param votes  number of votes the given answer has received.
   */
  constructor(public answer: Answer, public votes: number) {}
}
