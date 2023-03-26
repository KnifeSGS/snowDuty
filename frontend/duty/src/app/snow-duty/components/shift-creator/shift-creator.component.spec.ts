import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftCreatorComponent } from './shift-creator.component';

describe('ShiftCreatorComponent', () => {
  let component: ShiftCreatorComponent;
  let fixture: ComponentFixture<ShiftCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftCreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
