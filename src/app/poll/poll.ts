import { Answer } from './answer';
import { PollResult } from './poll-result';
/**
 * Represents a model of the poll.
 */
export class Poll {
  public title = '';
  public answers: Answer[] = [];
  public result: PollResult = new PollResult();

  constructor() {
    this.addAnswer(new Answer('First answer'));
    this.addAnswer(new Answer('Second answer'));
  }
  /**
   * Adds an answer to the poll.
   * @param answer to be added to the poll.
   */
  public addAnswer(answer: Answer): void {
    this.answers.push(answer);
    this.result.addAnswer(answer);
  }

  /**
   * Removes the specified option from te poll.
   * @param answer poll to be removed. If the poll does not contain specified option, then nothing will happen.
   */
  public deleteAnswer(answer: Answer): void {
    this.removeFromArray(this.answers, answer);
    this.deleteFromResults(answer);
  }

  /**
   * Votes for the specified answer. It increases the number of votes that was registered for this answer by one.
   * @param answer that the vote will be casted for.
   */
  public voteFor(answer: Answer): void {
    this.result.addVoteFor(answer);
  }

  private deleteFromResults(answer: Answer): void {
    this.result.deleteAnswer(answer);
  }

  private removeFromArray(array: Answer[], value: Answer): void {
    const index: number = array.indexOf(value, 0);
    if (index > -1) {
      array.splice(index, 1);
    }
  }
}
