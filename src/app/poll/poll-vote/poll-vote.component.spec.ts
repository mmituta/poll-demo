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
      const newOption = new Option('new');
      component.poll.addOption(newOption);

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        spyOn(component.voteCasted, 'emit');
        const secondInput = findInput('poll-answer-2');
        secondInput.click();
        button.click();
        expect(component.voteCasted.emit).toHaveBeenCalledWith(newOption);
      });
    })
  );

  it(
    'should emit the option only after button click',
    waitForAsync(() => {
      const thirdOption = new Option('third');

      component.poll = new Poll();
      component.poll.addOption(thirdOption);

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        spyOn(component.voteCasted, 'emit');
        const firstInput = findInput('poll-answer-0');
        const thirdInput = findInput('poll-answer-2');
        firstInput.click();
        thirdInput.click();
        button.click();
        expect(component.voteCasted.emit).not.toHaveBeenCalledWith(
          component.poll.options[0]
        );
        expect(component.voteCasted.emit).toHaveBeenCalledWith(thirdOption);
      });
    })
  );

  function findInput(id: string): HTMLInputElement {
    return debugElement.querySelector('#' + id) as HTMLInputElement;
  }
});
