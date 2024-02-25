import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerCreatorComponent } from './worker-creator.component';

describe('WorkerCreatorComponent', () => {
  let component: WorkerCreatorComponent;
  let fixture: ComponentFixture<WorkerCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerCreatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkerCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
