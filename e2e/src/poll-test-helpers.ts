import { element, by, ElementArrayFinder } from 'protractor';
import { WebDriverLocator } from 'protractor/built/locators';
export const ADD_ANSWER_BTN = 'add-answer-btn';
export const ADD_ANSWER_INPUT = 'add-answer-input';
export const VOTE_BTN = 'vote-btn';
export const TITLE_INPUT = 'poll-title-input';
export const TITLE_VOTING_LBL = 'poll-title-voting';
export const TITLE_RESULT_LBL = 'poll-title-result';
export const ANSWERS_COUNT_LBL = 'answers-count-lbl';
export const VOTES_COUNT_LBL = 'votes-count-lbl';

export function chartAnswerPresent(answer: string) {
  return element(by.cssContainingText('span.ct-label', answer)).isPresent();
}

 function chartBars(): ElementArrayFinder {
  return element.all(by.css('line.ct-bar'));
}

export function chartBar(answerNumber: number){
  return chartBars().get(answerNumber);
}

export function chartBarValue(answerNumber: number) {
  return chartBar(answerNumber).getAttribute('ct:value');
}

export function voteInputByAnswerNumber(
  answerNumber: number
): WebDriverLocator {
  return by.id(`poll-answer-${answerNumber}`);
}

export function voteLabelByAnswerNumber(
  answerNumber: number
): WebDriverLocator {
  return by.id(`poll-answer-${answerNumber}-lbl`);
}

export function editInputByAnswerNumber(
  answerNumber: number
): WebDriverLocator {
  return by.id(`answer-${answerNumber}-edit-input`);
}

export function removeBtnByAnswerNumber(
  answerNumber: number
): WebDriverLocator {
  return by.id(`answer-${answerNumber}-remove-btn`);
}

export function generateStringOfLength(length: number): string {
  let text = '';
  for (let i = 0; i < length; i++) {
    text += 'a';
  }
  return text;
}
