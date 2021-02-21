import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Answer } from '../answer';
import { PollDefinition } from '../poll';

import { PollDefinitionComponent } from './poll-definition.component';
import { deleteFrom } from '../../array-helper';

describe('Tests for the PollDefinitionComponent', () => {
  let component: PollDefinitionComponent;
  let fixture: ComponentFixture<PollDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PollDefinitionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable delete when only minimum number of options is left', () => {
    const poll: TestPollDefinition = new TestPollDefinition([
      new Answer('1'),
      new Answer('2'),
      new Answer('3'),
    ]);
    component.minAnswers = 3;
    component.poll = poll;
    poll.addAnswer(new Answer('4'));
    expect(component.minNumberOfAnswersReached()).toBeFalse();
    poll.deleteAnswer(poll.answers[0]);
    expect(component.minNumberOfAnswersReached()).toBeTrue();
  });

  it('should disable adding if max number of answer reached', () => {
    component.poll = new TestPollDefinition();
    component.maxAnswers = 4;
    component.addAnswer(new Answer('1'));
    component.addAnswer(new Answer('2'));
    component.addAnswer(new Answer('3'));
    expect(component.maxNumberOfAnswersReached()).toBeFalse();
    component.addAnswer(new Answer('4'));
    expect(component.maxNumberOfAnswersReached()).toBeTrue();
  });
});
class TestPollDefinition implements PollDefinition {
  title: string;
  constructor(public answers: Answer[] = []) {}

  addAnswer(answer: Answer): void {
    this.answers.push(answer);
  }
  deleteAnswer(answer: Answer): void {
    deleteFrom(this.answers, answer);
  }
  answersCount(): number {
    return this.answers.length;
  }
  getAnswers(): Answer[] {
    return this.answers;
  }
}

