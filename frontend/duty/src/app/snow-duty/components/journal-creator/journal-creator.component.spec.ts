import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalCreatorComponent } from './journal-creator.component';

describe('JournalCreatorComponent', () => {
  let component: JournalCreatorComponent;
  let fixture: ComponentFixture<JournalCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JournalCreatorComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(JournalCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
