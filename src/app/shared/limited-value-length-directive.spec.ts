import { LimitedValueLengthDirective } from './limited-value-length-directive';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  template:
    '<input id="limitOf5" type="text" appLimitedLength [limit]="5">' +
    '<input id="defaultLimit" type="text" appLimitedLength>',
})
class TestComponent {
  constructor() {}
}

describe('Tests for the LimitedValueLengthDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: HTMLElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, LimitedValueLengthDirective],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    debugElement = fixture.debugElement.nativeElement;
  });

  it('shld not disable the element if the value is shorter than the limit', () => {
    const inputField = debugElement.querySelector(
      '#limitOf5'
    ) as HTMLInputElement;
    inputField.value = '123';
    inputField.dispatchEvent(new Event('input'));

    expect(inputField.disabled).toBeFalse();
  });

  it('should disable the element if the value is equal to the limit', () => {
    const inputField = debugElement.querySelector(
      '#limitOf5'
    ) as HTMLInputElement;

    inputField.value = '12345';
    inputField.dispatchEvent(new Event('input'));

    expect(inputField.disabled).toBeTrue();
  });

  it('should disable the element after the value is longer than the limit', () => {
    const inputField = debugElement.querySelector(
      '#limitOf5'
    ) as HTMLInputElement;

    inputField.value = '123456';
    inputField.dispatchEvent(new Event('input'));

    expect(inputField.disabled).toBeTrue();
  });

  it('should limit the value to 80 characters by default', () => {
    const inputField = debugElement.querySelector(
      '#defaultLimit'
    ) as HTMLInputElement;

    inputField.value = 'a'.repeat(79);
    inputField.dispatchEvent(new Event('input'));

    expect(inputField.disabled).toBeFalse();

    inputField.value = 'a'.repeat(80);
    inputField.dispatchEvent(new Event('input'));

    expect(inputField.disabled).toBeTrue();
  });
});
