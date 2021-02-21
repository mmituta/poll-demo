import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Answer } from './answer';

import { PollComponent } from './poll.component';

describe('Tests for the PollComponent', () => {
  let component: PollComponent;
  let fixture: ComponentFixture<PollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PollComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add vote for an naswer', () => {
    const answer = new Answer('1');
    component.poll.addAnswer(answer);
    component.voteFor(answer);

    expect(component.poll.result.getVotesFor(answer)).toEqual(1);
  });

  it('should reset the poll', () => {
    const answer = new Answer('1');
    component.poll.addAnswer(answer);
    component.poll.title = 'a';
    component.voteFor(answer);

    component.resetPoll();
    expect(component.poll.title).toEqual('');
    expect(component.poll.answers).not.toContain(answer);
    expect(component.poll.result.hasAnswer(answer)).toBeFalse();
    expect(component.poll.result.voteCount()).toEqual(0);
  
  });
});
