import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollDefinitionComponent } from './poll-definition.component';

describe('PollDefinitionComponent', () => {
  let component: PollDefinitionComponent;
  let fixture: ComponentFixture<PollDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollDefinitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
