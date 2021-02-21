import { deleteFrom } from '../array-helper';
import { Answer } from './answer';
import { Result } from './result';
/**
 * Represents a model of the poll.
 */
export class Poll implements PollDefinition, PollResults {
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
   * @see {@link PollDefinition.addAnswer}
   */
  public addAnswer(answer: Answer): void {
    this.answers.push(answer);
    this.result.addAnswer(answer);
  }
  /**
   * @see {@link PollDefinition.deleteAnswer}
   */
  public deleteAnswer(answer: Answer): void {
    deleteFrom(this.answers, answer);
    this.deleteFromResults(answer);
  }
  /**
   * @see {@link PollDefinition.getAnswers}
   */
  public getAnswers(): Answer[] {
    return this.answers;
  }

  /**
   * @see {@link PollDefinition.answersCount}
   */
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
  /**
   * Title of the poll.
   */
  title: string;
  /**
   * Adds an answer to the poll.
   * @param answer to be added to the poll.
   */
  addAnswer(answer: Answer): void;
  /**
   * Removes the specified option from te poll.
   * @param answer poll to be removed. If the poll does not contain specified option, then nothing will happen.
   */
  deleteAnswer(answer: Answer): void;
  /**
   * Returns the total number of answrs in the poll.
   */
  answersCount(): number;
  /**
   * Returns the answers from the poll.
   */
  getAnswers(): Answer[];
}

/**
 * Defines the properties required for displaying the results of the poll.
 */
export interface PollResults {
  title: string;
  result: Result;
}

/**
 * Null object implementation of PollDefinition.
 */
export class NullObjectPollDefinition implements PollDefinition {
  title = '';
  addAnswer(answer: Answer): void {}
  deleteAnswer(answer: Answer): void {}
  answersCount(): number {
    return 0;
  }
  getAnswers(): Answer[] {
    return [];
  }
}
