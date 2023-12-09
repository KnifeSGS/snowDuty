import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractsComponent } from './subcontracts.component';

describe('SubcontractsComponent', () => {
  let component: SubcontractsComponent;
  let fixture: ComponentFixture<SubcontractsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubcontractsComponent]
    });
    fixture = TestBed.createComponent(SubcontractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
