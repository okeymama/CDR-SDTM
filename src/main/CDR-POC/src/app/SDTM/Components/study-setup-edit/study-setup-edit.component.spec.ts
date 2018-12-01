import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySetupEditComponent } from './study-setup-edit.component';

describe('StudySetupEditComponent', () => {
  let component: StudySetupEditComponent;
  let fixture: ComponentFixture<StudySetupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudySetupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudySetupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
