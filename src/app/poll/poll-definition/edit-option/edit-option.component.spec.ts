import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditOptionComponent } from './edit-option.component';
import { FormsModule } from '@angular/forms';

describe('Tests for the edit option component', () => {
  let component: EditOptionComponent;
  let fixture: ComponentFixture<EditOptionComponent>;

  let editInput: HTMLInputElement;
  let removeBtn: HTMLButtonElement;

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
    editInput = debugElement.querySelector('input') as HTMLInputElement;
    removeBtn = debugElement.querySelector('button') as HTMLButtonElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an option removed event', () => {
    spyOn(component.optionRemoved, 'emit');

    removeBtn.click();

    expect(component.optionRemoved.emit).toHaveBeenCalledWith(component.option);
  });

  it('should change the name of the option', () => {
    component.option.label = 'original value';
    editInput.value = 'new value';
    editInput.dispatchEvent(new Event('input'));

    expect(component.option.label).toEqual('new value');
  });

  it(
    'should disable the remove button using input parameter',
    waitForAsync(() => {
      component.disableDelete = true;
      fixture.detectChanges();
      fixture.whenStable().then(() => expect(removeBtn.disabled).toBeTrue());
    })
  );

  it(
    'should assign ids based on input',
    waitForAsync(() => {
      component.id = 'test-id';
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(editInput.getAttribute('id')).toEqual('test-id-edit-input');
        expect(removeBtn.getAttribute('id')).toEqual('test-id-remove-btn');
      });
    })
  );
});
