import { PollDefinition } from './poll';
import { Answer } from './answer';
/**
 * Null object implementation of PollDefinition.
 */
export class NullObjectPoll implements PollDefinition {
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
