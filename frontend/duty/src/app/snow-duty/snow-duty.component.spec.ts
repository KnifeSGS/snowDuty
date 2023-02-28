import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowDutyComponent } from './snow-duty.component';

describe('SnowDutyComponent', () => {
  let component: SnowDutyComponent;
  let fixture: ComponentFixture<SnowDutyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnowDutyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnowDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
