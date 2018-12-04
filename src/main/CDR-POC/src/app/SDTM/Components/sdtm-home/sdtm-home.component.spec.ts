import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdtmHomeComponent } from './sdtm-home.component';

describe('SdtmHomeComponent', () => {
  let component: SdtmHomeComponent;
  let fixture: ComponentFixture<SdtmHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdtmHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdtmHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
