import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLineageComponent } from './data-lineage.component';

describe('DataLineageComponent', () => {
  let component: DataLineageComponent;
  let fixture: ComponentFixture<DataLineageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataLineageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataLineageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
