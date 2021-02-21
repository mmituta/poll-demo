import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddAnswerComponent } from './answer-add.component';
import { FormsModule } from '@angular/forms';
import { Answer } from '../../answer';

describe('Tests for AddAnswerComponent', () => {
  let component: AddAnswerComponent;
  let fixture: ComponentFixture<AddAnswerComponent>;

  let inputText: HTMLInputElement;
  let button: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AddAnswerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const debugElement: HTMLElement = fixture.debugElement.nativeElement;
    inputText = debugElement.querySelector('input') as HTMLInputElement;
    button = debugElement.querySelector('button') as HTMLButtonElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an answer added event', () => {
    inputText.value = 'answer name';
    inputText.dispatchEvent(new Event('input'));

    spyOn(component.answerCreated, 'emit');

    button.click();

    expect(component.answerCreated.emit).toHaveBeenCalledWith(
      new Answer('answer name')
    );
  });

  it(
    'should reset the text after an answer was added',
    waitForAsync(() => {
      inputText.value = 'Some text';
      inputText.dispatchEvent(new Event('input'));

      button.click();

      fixture.detectChanges();
      fixture.whenStable().then(() => expect(inputText.value).toBe(''));
    })
  );

  it(
    'should disable text input and button using input parameter',
    waitForAsync(() => {
      component.disabled = true;
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputText.disabled).toBeTrue();
        expect(button.disabled).toBeTrue();
      });
    })
  );
});
