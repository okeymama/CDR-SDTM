import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySetupComponent } from './study-setup.component';

describe('StudySetupComponent', () => {
  let component: StudySetupComponent;
  let fixture: ComponentFixture<StudySetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudySetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
