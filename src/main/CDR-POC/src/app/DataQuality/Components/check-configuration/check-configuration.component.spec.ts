import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckConfigurationComponent } from './check-configuration.component';

describe('CheckConfigurationComponent', () => {
  let component: CheckConfigurationComponent;
  let fixture: ComponentFixture<CheckConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
