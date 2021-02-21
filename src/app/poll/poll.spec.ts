import { Option } from './option';
import { Poll } from './poll';
describe('Tests for the Poll class', () => {
  let poll: Poll;
  beforeEach(() => {
    poll = new Poll();
  });

  it('should create an option with the given text', () => {
    const option = new Option('name');
    poll.addOption(option);

    expect(poll.options).toContain(option);
  });

  it('should remove the specified option', () => {
    const option = new Option('option');
    poll.addOption(option);
    poll.deleteAnswer(option);

    expect(poll.options).not.toContain(option);
  });
});
