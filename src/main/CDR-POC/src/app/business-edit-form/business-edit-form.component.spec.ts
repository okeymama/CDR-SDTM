import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessEditFormComponent } from './business-edit-form.component';

describe('BusinessEditFormComponent', () => {
  let component: BusinessEditFormComponent;
  let fixture: ComponentFixture<BusinessEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
