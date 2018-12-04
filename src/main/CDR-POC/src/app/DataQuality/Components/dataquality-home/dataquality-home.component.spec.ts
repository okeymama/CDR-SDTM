import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataqualityHomeComponent } from './dataquality-home.component';

describe('DataqualityHomeComponent', () => {
  let component: DataqualityHomeComponent;
  let fixture: ComponentFixture<DataqualityHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataqualityHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataqualityHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
