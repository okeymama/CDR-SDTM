import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KendoGridDeleteConfirmComponent } from './kendo-grid-delete-confirm.component';

describe('KendoGridDeleteConfirmComponent', () => {
  let component: KendoGridDeleteConfirmComponent;
  let fixture: ComponentFixture<KendoGridDeleteConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KendoGridDeleteConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KendoGridDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
