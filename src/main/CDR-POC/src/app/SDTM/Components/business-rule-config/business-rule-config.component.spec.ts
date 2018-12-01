import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessRuleConfigComponent } from './business-rule-config.component';

describe('BusinessRuleConfigComponent', () => {
  let component: BusinessRuleConfigComponent;
  let fixture: ComponentFixture<BusinessRuleConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessRuleConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessRuleConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
