import { deleteFrom } from '../array-helper';
import { Answer } from './answer';
import { Result } from './result';
/**
 * Represents a model of the poll.
 */
export class Poll implements PollDefinition {
  public title = '';
  private answers: Answer[] = [];
  public result: Result = new Result();

  /**
   * Creates a new instance of Poll. Notice, that it will automatically create two default answers.
   */
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
    deleteFrom(this.answers, answer);
    this.deleteFromResults(answer);
  }

  public getAnswers(): Answer[] {
    return this.answers;
  }

  public answersCount(): number {
    return this.answers.length;
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

}

/**
 * Defines the properties necessary to define the poll.
 */
export interface PollDefinition {
  title: string;
  addAnswer(answer: Answer): void;
  deleteAnswer(answer: Answer): void;
  answersCount(): number;
  getAnswers(): Answer[];
}
