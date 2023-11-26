import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorComponent } from './subcontractor.component';

describe('SubcontractorComponent', () => {
  let component: SubcontractorComponent;
  let fixture: ComponentFixture<SubcontractorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubcontractorComponent]
    });
    fixture = TestBed.createComponent(SubcontractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
