import { browser, logging, by, element, ExpectedConditions } from 'protractor';
import { AppPage } from './app.po';

const ADD_ANSWER_BTN = 'add-answer-btn';
const ADD_ANSWER_INPUT = 'add-answer-input';
const VOTE_BTN = 'vote-btn';
const TITLE_INPUT = 'poll-title-input';
const TITLE_VOTING_LBL = 'poll-title-voting';
const TITLE_RESULT_LBL = 'poll-title-result';
describe('poll-demo app', () => {
  let page: AppPage;

  beforeEach(async () => {
    page = new AppPage();
    await page.navigateTo();
  });

  it('should edit poll title', async () => {
    element(by.id(TITLE_INPUT)).sendKeys('poll title');

    expect(await element(by.id(TITLE_VOTING_LBL)).getText()).toEqual('poll title');
    expect(await element(by.id(TITLE_RESULT_LBL)).getText()).toEqual('poll title');
  });

  it('should add poll answer', async () => {
    await element(by.id(ADD_ANSWER_INPUT)).sendKeys('answer');
    await element(by.id(ADD_ANSWER_BTN)).click();

    expect(await element(by.id('poll-answer-0')).isPresent()).toBeTruthy();
    expect(await element(by.id('poll-answer-0-lbl')).getText()).toEqual(
      'answer'
    );
    expect(
      await element(by.cssContainingText('span.ct-label', 'answer')).isPresent()
    ).toBeTruthy();
  });

  it('should vote for poll answers', async () => {
    await element(by.id(ADD_ANSWER_INPUT)).sendKeys('first answer');
    await element(by.id(ADD_ANSWER_BTN)).click();
    await element(by.id(ADD_ANSWER_INPUT)).sendKeys('second answer');
    await element(by.id(ADD_ANSWER_BTN)).click();

    await element(by.id('poll-answer-0-lbl')).click();
    await element(by.id(VOTE_BTN)).click();
    await element(by.id(VOTE_BTN)).click();
    await element(by.id('poll-answer-1-lbl')).click();
    await element(by.id(VOTE_BTN)).click();

    const chartBars = element.all(by.css('line.ct-bar'));
    expect(await chartBars.get(0).getAttribute('ct:value')).toEqual('2');
    expect(await chartBars.get(1).getAttribute('ct:value')).toEqual('1');
  });

  it('should reset the poll', async () => {
    element(by.id(TITLE_INPUT)).sendKeys('some title');

    await element(by.id(ADD_ANSWER_INPUT)).sendKeys('some answer');
    await element(by.id(ADD_ANSWER_BTN)).click();

    await element(by.id('poll-answer-0-lbl')).click();
    await element(by.id(VOTE_BTN)).click();
    await element(by.id('reset-btn')).click();

    expect(await element(by.id(TITLE_INPUT)).getText()).toEqual('');

    expect(await element(by.id(TITLE_VOTING_LBL)).getText()).toEqual('');
    expect(await element(by.id(TITLE_RESULT_LBL)).getText()).toEqual('');
    expect(await element(by.id('poll-answer-0')).isPresent()).toBeFalsy();
    expect(await element(by.id('poll-answer-0-lbl')).isPresent()).toBeFalsy();
    expect( await element(by.css('line.ct-bar')).isPresent()).toBeFalsy();
    expect(
      await element(by.cssContainingText('span.ct-label', 'some answer')).isPresent()
    ).toBeFalsy();
    
  });

  it( 'should allow only 10 answers', async()=>{
    for(let answer=0; answer< 10; answer++){
      await element(by.id(ADD_ANSWER_INPUT)).sendKeys('answer: '+answer);
      await element(by.id(ADD_ANSWER_BTN)).click();
    }

    expect(await element(by.id(ADD_ANSWER_INPUT)).isEnabled()).toBeFalsy();
    expect(await element(by.id(ADD_ANSWER_BTN)).isEnabled()).toBeFalsy();

    await element(by.id('answer-0-remove-btn')).click();
    
    expect(await element(by.id(ADD_ANSWER_INPUT)).isEnabled()).toBeTruthy();
    expect(await element(by.id(ADD_ANSWER_BTN)).isEnabled()).toBeTruthy();
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
