import { Answer } from './answer';
import { Result, AnswerVote } from './result';
describe('Tests for the Result class', () => {
  let result: Result;

  beforeEach(() => {
    result = new Result();
  });
  it('should return 0 vote count if there is no answers to vote for', () => {
    expect(result.voteCount()).toEqual(0);
  });

  it('should return 0 vote count if there is an answer but it has no votes', () => {
    result.addAnswer(new Answer('test'));

    expect(result.voteCount()).toEqual(0);
  });

  it('should return vote count for single answer', () => {
    const answer = new Answer('test');
    result.addAnswer(answer);
    result.addVoteFor(answer);
    result.addVoteFor(answer);

    expect(result.voteCount()).toEqual(2);
  });

  it('should return vote count for multiple answers', () => {
    const first = new Answer('1');
    result.addAnswer(first);
    result.addVoteFor(first);
    result.addVoteFor(first);

    const second = new Answer('2');
    result.addAnswer(second);
    result.addVoteFor(second);
    result.addVoteFor(second);
    result.addVoteFor(second);

    expect(result.voteCount()).toEqual(5);
  });

  it('should remove an answer', () => {
    const answer = new Answer('1');
    result.addAnswer(answer);
    expect(result.hasAnswer(answer)).toBeTrue();

    result.deleteAnswer(answer);
    expect(result.hasAnswer(answer)).toBeFalse();
  });

  it('should remove the votes when deleting the answer', () => {
    const answer = new Answer('1');
    result.addAnswer(answer);
    result.addVoteFor(answer);
    result.deleteAnswer(answer);

    expect(result.voteCount()).toEqual(0);
  });

  it('should return the votes', () => {
    const firstAnswer = new Answer('answer 1');

    const secondAnswer = new Answer('answer 2');
    result.addAnswer(firstAnswer);
    result.addAnswer(secondAnswer);
    result.addVoteFor(firstAnswer);

    expect(result.getVotes()).toEqual([
      new AnswerVote(firstAnswer, 1),
      new AnswerVote(secondAnswer, 0),
    ]);
  });

  it('should return the votes for an answer', () => {
    const firstAnswer = new Answer('1');
    const secondAnswer = new Answer('2');

    result.addAnswer(firstAnswer);
    result.addVoteFor(firstAnswer);
    result.addVoteFor(firstAnswer);
    result.addAnswer(secondAnswer);

    expect(result.getVotesFor(firstAnswer)).toEqual(2);
    expect(result.getVotesFor(secondAnswer)).toEqual(0);
  });

  it('should throw error when adding vote for non existing answer', () => {
    expect(() => result.addVoteFor(new Answer('1'))).toThrow(
      new Error(`Answer '1' does not exist`)
    );
  });

  it('should throw error when gettings votes for non existing answer', () => {
    expect(() => result.getVotesFor(new Answer('1'))).toThrow(
      new Error(`Answer '1' does not exist`)
    );
  });

  it('should do nothing when removing answer that does not exist', () => {
    const answer = new Answer('1');
    expect(result.hasAnswer(answer)).toBeFalse();
    result.deleteAnswer(answer);
    expect(result.hasAnswer(answer)).toBeFalse();
  });
});
