import { Answer } from './answer';
import { Poll } from './poll';
describe('Tests for the Poll class', () => {
  let poll: Poll;
  beforeEach(() => {
    poll = new Poll();
  });

  it('should create an option with the given text', () => {
    const option = new Answer('name');
    poll.addAnswer(option);

    expect(poll.answers).toContain(option);
  });

  it('should remove the specified option', () => {
    const option = new Answer('option');
    poll.addAnswer(option);
    poll.deleteAnswer(option);

    expect(poll.answers).not.toContain(option);
  });
});
