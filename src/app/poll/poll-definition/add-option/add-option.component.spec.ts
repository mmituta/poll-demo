import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddOptionComponent } from './add-option.component';
import { FormsModule } from '@angular/forms';
import { Option } from '../../option';

describe('Tests for add option component', () => {
  let component: AddOptionComponent;
  let fixture: ComponentFixture<AddOptionComponent>;

  let inputText: HTMLInputElement;
  let button: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AddOptionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const debugElement: HTMLElement = fixture.debugElement.nativeElement;
    inputText = debugElement.querySelector('input') as HTMLInputElement;
    button = debugElement.querySelector('button') as HTMLButtonElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an option added event', () => {

    inputText.value = 'Option name';
    inputText.dispatchEvent(new Event('input'));

    spyOn(component.optionCreated, 'emit');

    button.click();

    expect(component.optionCreated.emit).toHaveBeenCalledWith(new Option('Option name'));
  });

  it(
    'should reset the text after an option was added',
    waitForAsync(() => {
      inputText.value = 'Some text';
      inputText.dispatchEvent(new Event('input'));

      button.click();

      fixture.detectChanges();
      fixture.whenStable().then(() => expect(inputText.value).toBe(''));
    })
  );
});
