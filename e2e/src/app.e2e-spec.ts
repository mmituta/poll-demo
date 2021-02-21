import { browser, logging, by, element } from 'protractor';
import { AppPage } from './app.po';
import { chartBarValue, chartBar } from './poll-test-helpers';
import {
  TITLE_VOTING_LBL,
  TITLE_INPUT,
  TITLE_RESULT_LBL,
  ADD_ANSWER_INPUT,
  ADD_ANSWER_BTN,
  VOTE_BTN,
  VOTES_COUNT_LBL,
  ANSWERS_COUNT_LBL,
} from './poll-test-helpers';
import {
  editInputByAnswerNumber,
  removeBtnByAnswerNumber,
} from './poll-test-helpers';
import {
  chartAnswerPresent,
  generateStringOfLength,
  voteInputByAnswerNumber,
  voteLabelByAnswerNumber,
} from './poll-test-helpers';

const RESET_BTN = 'reset-btn';
describe('poll-demo app', () => {
  let page: AppPage;

  beforeEach(async () => {
    page = new AppPage();
    await page.navigateTo();
  });

  it('should edit poll title', async () => {
    await element(by.id(TITLE_INPUT)).sendKeys('title');

    expect(await element(by.id(TITLE_VOTING_LBL)).getText()).toEqual('title');
    expect(await element(by.id(TITLE_RESULT_LBL)).getText()).toEqual('title');
  });

  it('should add poll answer', async () => {
    await element(by.id(ADD_ANSWER_INPUT)).sendKeys('abc');
    await element(by.id(ADD_ANSWER_BTN)).click();

    expect(await element(voteInputByAnswerNumber(2)).isPresent()).toBeTruthy();
    expect(await element(voteLabelByAnswerNumber(2)).getText()).toEqual('abc');
    expect(await chartAnswerPresent('abc')).toBeTruthy();
  });

  it('should edit poll answer', async () => {
    await element(editInputByAnswerNumber(0)).clear();
    await element(editInputByAnswerNumber(0)).sendKeys('edit');

    expect(await element(voteInputByAnswerNumber(0)).isPresent()).toBeTruthy();
    expect(await element(voteLabelByAnswerNumber(0)).getText()).toEqual('edit');
    expect(await chartAnswerPresent('edit')).toBeTruthy();
  });
  it('should delete poll answer', async () => {
    await element(by.id(ADD_ANSWER_INPUT)).sendKeys('answer');
    await element(by.id(ADD_ANSWER_BTN)).click();
    await element(removeBtnByAnswerNumber(2)).click();

    expect(await element(voteInputByAnswerNumber(2)).isPresent()).toBeFalsy();
    expect(await element(voteLabelByAnswerNumber(2)).isPresent()).toBeFalsy();
    expect(await chartAnswerPresent('answer')).toBeFalsy();
  });

  it('should vote for poll answers', async () => {
    await element(voteLabelByAnswerNumber(0)).click();
    await element(by.id(VOTE_BTN)).click();
    await element(by.id(VOTE_BTN)).click();
    await element(voteLabelByAnswerNumber(1)).click();
    await element(by.id(VOTE_BTN)).click();

    expect(await chartBarValue(0)).toEqual('2');
    expect(await chartBarValue(1)).toEqual('1');
  });

  it('should reset the poll', async () => {
    await element(by.id(TITLE_INPUT)).sendKeys('some title');

    await element(by.id(ADD_ANSWER_INPUT)).sendKeys('some answer');
    await element(by.id(ADD_ANSWER_BTN)).click();

    await element(voteLabelByAnswerNumber(0)).click();
    await element(by.id(VOTE_BTN)).click();
    await element(by.id(RESET_BTN)).click();

    expect(await element(by.id(TITLE_INPUT)).getText()).toEqual('');

    expect(await element(by.id(TITLE_VOTING_LBL)).getText()).toEqual('');
    expect(await element(by.id(TITLE_RESULT_LBL)).getText()).toEqual('');
    expect(await element(voteInputByAnswerNumber(2)).isPresent()).toBeFalsy();
    expect(await element(voteLabelByAnswerNumber(2)).isPresent()).toBeFalsy();
    expect(await chartBar(0).isPresent()).toBeTruthy();
    expect(await chartBar(1).isPresent()).toBeTruthy();
    expect(await chartBar(2).isPresent()).toBeFalsy();

    expect(await chartAnswerPresent('some answer')).toBeFalsy();
  });

  it('should allow only 10 answers', async () => {
    for (let answer = 0; answer < 8; answer++) {
      await element(by.id(ADD_ANSWER_INPUT)).sendKeys('answer: ' + answer);
      await element(by.id(ADD_ANSWER_BTN)).click();
    }

    expect(await element(by.id(ADD_ANSWER_INPUT)).isEnabled()).toBeFalsy();
    expect(await element(by.id(ADD_ANSWER_BTN)).isEnabled()).toBeFalsy();

    await element(removeBtnByAnswerNumber(0)).click();

    expect(await element(by.id(ADD_ANSWER_INPUT)).isEnabled()).toBeTruthy();
    expect(await element(by.id(ADD_ANSWER_BTN)).isEnabled()).toBeTruthy();
  });

  it('should disable answer fields after 80 characters', async () => {
    const textWith80Chars = generateStringOfLength(80);

    await element(editInputByAnswerNumber(0)).clear();
    await element(editInputByAnswerNumber(0)).sendKeys(textWith80Chars);
    expect(await element(editInputByAnswerNumber(0)).isEnabled()).toBeFalsy();

    await element(by.id(ADD_ANSWER_INPUT)).sendKeys(textWith80Chars);
    expect(await element(by.id(ADD_ANSWER_INPUT)).isEnabled()).toBeFalsy();

    await element(by.id(TITLE_INPUT)).sendKeys(textWith80Chars);
    expect(await element(by.id(TITLE_INPUT)).isEnabled()).toBeFalsy();
  });

  it('should have two poll answers by default', async () => {
    expect(await element(voteInputByAnswerNumber(0)).isPresent()).toBeTruthy();
    expect(await element(voteLabelByAnswerNumber(0)).isPresent()).toBeTruthy();
    expect(await element(voteInputByAnswerNumber(1)).isPresent()).toBeTruthy();
    expect(await element(voteLabelByAnswerNumber(1)).isPresent()).toBeTruthy();

    expect(await element(voteInputByAnswerNumber(2)).isPresent()).toBeFalsy();
    expect(await element(voteLabelByAnswerNumber(2)).isPresent()).toBeFalsy();
  });

  it('should disable delete option if only two answers are left', async () => {
    await element(by.id(ADD_ANSWER_INPUT)).sendKeys('a');
    await element(by.id(ADD_ANSWER_BTN)).click();

    expect(await element(removeBtnByAnswerNumber(0)).isEnabled()).toBeTruthy();
    await element(removeBtnByAnswerNumber(0)).click();
    expect(await element(removeBtnByAnswerNumber(0)).isEnabled()).toBeFalsy();
  });

  it('should display total votes', async () => {
    await element(voteLabelByAnswerNumber(1)).click();
    await element(by.id(VOTE_BTN)).click();
    await element(by.id(VOTE_BTN)).click();
    await element(voteLabelByAnswerNumber(0)).click();
    await element(by.id(VOTE_BTN)).click();
    await element(by.id(VOTE_BTN)).click();
    await element(by.id(VOTE_BTN)).click();

    expect(await element(by.id(VOTES_COUNT_LBL)).getText()).toMatch('5$');
  });

  it('should display answers count', async () => {
    for (let i = 0; i < 4; i++) {
      await element(by.id(ADD_ANSWER_INPUT)).sendKeys('a');
      await element(by.id(ADD_ANSWER_BTN)).click();
    }
    expect(await element(by.id(ANSWERS_COUNT_LBL)).getText()).toMatch('^6');
  });
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
