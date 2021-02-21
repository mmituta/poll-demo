import { Answer } from './answer';
import { Poll } from './poll';
describe('Tests for the Poll class', () => {
  let poll: Poll;
  beforeEach(() => {
    poll = new Poll();
  });

  it('should create an answer with the given text', () => {
    const answer = new Answer('name');
    poll.addAnswer(answer);

    expect(poll.getAnswers()).toContain(answer);
  });

  it('should remove the specified answer', () => {
    const answer = new Answer('option');
    poll.addAnswer(answer);
    poll.deleteAnswer(answer);

    expect(poll.getAnswers()).not.toContain(answer);
  });
});
