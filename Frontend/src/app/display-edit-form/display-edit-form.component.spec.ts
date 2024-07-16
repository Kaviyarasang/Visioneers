import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayEditFormComponent } from './display-edit-form.component';

describe('DisplayEditFormComponent', () => {
  let component: DisplayEditFormComponent;
  let fixture: ComponentFixture<DisplayEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayEditFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
