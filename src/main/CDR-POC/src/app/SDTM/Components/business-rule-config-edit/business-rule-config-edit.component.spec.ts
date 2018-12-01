import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessRuleConfigEditComponent } from './business-rule-config-edit.component';

describe('BusinessRuleConfigEditComponent', () => {
  let component: BusinessRuleConfigEditComponent;
  let fixture: ComponentFixture<BusinessRuleConfigEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessRuleConfigEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessRuleConfigEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
