import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdtmComponent } from './sdtm.component';

describe('SdtmComponent', () => {
  let component: SdtmComponent;
  let fixture: ComponentFixture<SdtmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdtmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
