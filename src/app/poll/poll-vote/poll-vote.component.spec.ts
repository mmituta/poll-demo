import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PollVoteComponent } from './poll-vote.component';
import { FormsModule } from '@angular/forms';
import { Poll } from '../poll';
import { Option } from '../option';

describe('Tests for the PollVoteComponent', () => {
  let component: PollVoteComponent;
  let fixture: ComponentFixture<PollVoteComponent>;

  let button: HTMLButtonElement;
  let debugElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [PollVoteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollVoteComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement.nativeElement;
    button = debugElement.querySelector('button') as HTMLButtonElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should emit the selected option',
    waitForAsync(() => {
      component.poll = new Poll();
      component.poll.addOption(new Option('first'));
      const secondOption = new Option('second');
      component.poll.addOption(secondOption);

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        spyOn(component.voteCasted, 'emit');
        const secondInput = findInput('poll-answer-1');
        secondInput.click();
        button.click();
        expect(component.voteCasted.emit).toHaveBeenCalledWith(secondOption);
      });
    })
  );

  it(
    'should emit the option only after button click',
    waitForAsync(() => {
      const firstOption = new Option('first');
      const secondOption = new Option('second');

      component.poll = new Poll();
      component.poll.addOption(firstOption);
      component.poll.addOption(secondOption);

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        spyOn(component.voteCasted, 'emit');
        const firstInput = findInput('poll-answer-0');
        const secondInput = findInput('poll-answer-1');
        secondInput.click();
        firstInput.click();
        button.click();
        expect(component.voteCasted.emit).not.toHaveBeenCalledWith(
          secondOption
        );
        expect(component.voteCasted.emit).toHaveBeenCalledWith(firstOption);
      });
    })
  );

  function findInput(id: string): HTMLInputElement {
    return debugElement.querySelector('#' + id) as HTMLInputElement;
  }
});
