import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOptionComponent } from './edit-option.component';
import { FormsModule } from '@angular/forms';

describe('Tests for the edit option component', () => {
  let component: EditOptionComponent;
  let fixture: ComponentFixture<EditOptionComponent>;

  let inputText: HTMLInputElement;
  let button: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [EditOptionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const debugElement: HTMLElement = fixture.debugElement.nativeElement;
    inputText = debugElement.querySelector('input') as HTMLInputElement;
    button = debugElement.querySelector('button') as HTMLButtonElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an option removed event', () => {
    spyOn(component.optionRemoved, 'emit');

    button.click();

    expect(component.optionRemoved.emit).toHaveBeenCalledWith(component.option);
  });

  it('should change the name of the option', () => {
    component.option.label = 'original value';
    inputText.value = 'new value';
    inputText.dispatchEvent(new Event('input'));

    expect(component.option.label).toEqual('new value');
  });
});
