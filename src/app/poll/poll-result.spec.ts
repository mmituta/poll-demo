import { Option } from './option';
import { PollResult, AnswerVote } from './poll-result';
describe('tests for the PollResult class', () => {
  let result: PollResult;

  beforeEach(() => {
    result = new PollResult();
  });
  it('should return 0 vote count if there is no answers to vote for', () => {
    expect(result.voteCount()).toEqual(0);
  });

  it('should return 0 vote count if there is an answer but it has no votes', () => {
    result.addAnswer(new Option('test'));

    expect(result.voteCount()).toEqual(0);
  });

  it('should return vote count for single answer', () => {
    const answer = new Option('test');
    result.addAnswer(answer);
    result.addVoteFor(answer);
    result.addVoteFor(answer);

    expect(result.voteCount()).toEqual(2);
  });

  it('should return vote count for multiple answers', () => {
    const first = new Option('1');
    result.addAnswer(first);
    result.addVoteFor(first);
    result.addVoteFor(first);

    const second = new Option('2');
    result.addAnswer(second);
    result.addVoteFor(second);
    result.addVoteFor(second);
    result.addVoteFor(second);

    expect(result.voteCount()).toEqual(5);
  });

  it('should remove an answer', () => {
    const answer = new Option('1');
    result.addAnswer(answer);
    expect(result.hasAnswer(answer)).toBeTrue();

    result.deleteAnswer(answer);
    expect(result.hasAnswer(answer)).toBeFalse();
  });

  it('should remove the votes when deleting the answer', () => {
    const answer = new Option('1');
    result.addAnswer(answer);
    result.addVoteFor(answer);
    result.deleteAnswer(answer);

    expect(result.voteCount()).toEqual(0);
  });

  it('should return the votes', () => {
    const firstAnswer = new Option('answer 1');
    
    const secondAnswer = new Option('answer 2');
    result.addAnswer(firstAnswer);
    result.addAnswer(secondAnswer);
    result.addVoteFor(firstAnswer);

    expect(result.getVotes()).toEqual([new AnswerVote(firstAnswer, 1), new AnswerVote(secondAnswer, 0)]);

  });

  it('should throw error when adding vote for non existing answer', () => {
    expect(() => result.addVoteFor(new Option('1'))).toThrow(
      new Error(`Answer '1' does not exist`)
    );
  });
});
