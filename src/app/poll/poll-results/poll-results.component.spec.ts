import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Answer } from '../answer';
import { Poll } from '../poll';

import { PollResultsComponent } from './poll-results.component';

describe('Tests for the PollResultsComponent', () => {
  let component: PollResultsComponent;
  let fixture: ComponentFixture<PollResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PollResultsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the vote count', () => {
    const poll = new Poll();
    component.results = poll;
    const answer = new Answer('test');
    poll.addAnswer(answer);
    poll.voteFor(answer);
    poll.voteFor(answer);
    poll.voteFor(answer);

    expect(component.voteCount()).toEqual(3);
  });
});
