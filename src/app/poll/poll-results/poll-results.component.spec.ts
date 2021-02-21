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
    component.poll = new Poll();
    const answer = new Answer('test');
    component.poll.addAnswer(answer);
    component.poll.voteFor(answer);
    component.poll.voteFor(answer);
    component.poll.voteFor(answer);

    expect(component.voteCount()).toEqual(3);
  });
});
