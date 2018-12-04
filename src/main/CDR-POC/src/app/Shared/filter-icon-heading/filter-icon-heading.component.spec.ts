import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterIconHeadingComponent } from './filter-icon-heading.component';

describe('FilterIconHeadingComponent', () => {
  let component: FilterIconHeadingComponent;
  let fixture: ComponentFixture<FilterIconHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterIconHeadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterIconHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
