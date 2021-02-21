import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Answer } from '../answer';
import { Poll } from '../poll';

import { PollDefinitionComponent } from './poll-definition.component';

describe('PollDefinitionComponent', () => {
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
    const poll: Poll = new Poll();
    poll.answers = [new Answer('1'), new Answer('2'), new Answer('3')];

    component.minAnswers = 3;
    component.poll = poll;
    component.addAnswer(new Answer('4'));

    expect(component.minNumberOfAnswersReached()).toBeFalse();
    component.removeAnswer(poll.answers[0]);
    expect(component.minNumberOfAnswersReached()).toBeTrue();
  });

  it('should disable adding if max number of answer reached', () => {
    component.maxAnswers = 4;
    component.addAnswer(new Answer('new'));
    expect(component.maxNumberOfAnswersReached()).toBeFalse();
    component.addAnswer(new Answer('another'));
    expect(component.maxNumberOfAnswersReached()).toBeTrue();
  });
});
