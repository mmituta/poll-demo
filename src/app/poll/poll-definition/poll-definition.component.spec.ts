import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Option } from '../option';
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
    poll.options = [new Option('1'), new Option('2'), new Option('3')];

    component.minAnswers = 3;
    component.poll = poll;
    component.onOptionAdded(new Option('4'));

    expect(component.isDeleteDisabled()).toBeFalse();
    component.onOptionRemoved(poll.options[0]);
    expect(component.isDeleteDisabled()).toBeTrue();
  });

  it('should disable adding if max number of answer reached', () => {
    component.maxAnswers = 4;
    component.onOptionAdded(new Option('new'));
    expect(component.isAddDisabled()).toBeFalse();
    component.onOptionAdded(new Option('another'));
    expect(component.isAddDisabled()).toBeTrue();
  });
});
