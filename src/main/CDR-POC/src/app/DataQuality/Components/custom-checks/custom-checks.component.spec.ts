import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomChecksComponent } from './custom-checks.component';

describe('CustomChecksComponent', () => {
  let component: CustomChecksComponent;
  let fixture: ComponentFixture<CustomChecksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomChecksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
